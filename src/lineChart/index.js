import contentTemplate from './index.rgl';
import Chart from '../chart';
import _ from '../util';
import { dom } from 'regularjs';

const TICKES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 30, 40, 50, 100, 200, 500, 1000, 1];

/**
 * @class LineChart
 * @extends Chart
 * @param {Object}                  options.data                     =  绑定属性
 * @param {string='100%'}           options.data.width               => 图表宽度
 * @param {string='480px'}          options.data.height              => 图表高度
 * @param {string=''}               options.data.title               => 标题
 * @param {string=''}               options.data.titleTemplate      @=> 标题模板
 * @param {string=''}               options.data.tooltipTemplate    @=> 工具提示模板
 * @param {Array}                   options.data.data                => 数据。如果为`undefined`，表示数据正在加载；如果为`[]`，表示数据为空。
 * @param {Object}                  options.data.xAxis               => 横坐标信息
 * @param {Object}                  options.data.yAxis               => 纵坐标信息
 * @param {Array=[]}                options.data.series              => 序列信息
 * @param {boolean=false}           options.data.smooth              => 是否用光滑曲线
 * @param {boolean=false}           options.data.fill                => 是否填充区域
 * @param {boolean=false}           options.data.border              => 是否显示边框
 * @param {boolean=true}            options.data.legend              => 是否显示图例
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string='m-lineChart'}    options.data.class               => 补充class
 */
const LineChart = Chart.extend({
    name: 'lineChart',
    /**
     * @protected
     * @override
     */
    config() {
        this.defaults({
            // @inherited width: '100%',
            // @inherited height: '480px',
            // @inherited title: '',
            // @inherited titleTemplate: '',
            _width: undefined,
            _height: undefined,
            contentTemplate,
            class: 'm-lineChart',
            smooth: false,
            fill: false,
            data: undefined,
            xAxis: {},
            yAxis: {
                min: undefined,
                max: undefined,
            },
            series: [],
            _xAxis: { data: [] },
            _yAxis: { data: [] },
            tooltipTemplate: '',
        });
        this.supr();

        this._onResize = this._onResize.bind(this);
        dom.on(window, 'resize', this._onResize);
    },
    destroy() {
        dom.off(window, 'resize', this._onResize);
        this.supr();
    },
    /**
     * @private
     */
    _getSize() {
        if (!this.$refs)
            return;

        this.data._width = this.$refs.grid && this.$refs.grid.offsetWidth;
        this.data._height = this.$refs.grid && this.$refs.grid.offsetHeight;
    },
    /**
     * @private
     */
    _onResize() {
        this._getSize();
        this.$update();
    },
    draw() {
        if (!this.data.data || !this.data.data.length)
            return;

        this._getSize();

        //
        // 确定横坐标
        //
        {
            const _xAxis = this.data._xAxis;
            _xAxis.count = this.data.xAxis.count || 12;
            let pieceCounts = this.data.data.length - 1;
            let tick = pieceCounts / _xAxis.count;
            if (tick !== parseInt(tick)) {
                tick = 1;
                while (!(pieceCounts / tick <= _xAxis.count && pieceCounts % tick === 0)) {
                    for (let i = 0; i < TICKES.length; i++) {
                        tick = TICKES[i];
                        if (pieceCounts / tick <= _xAxis.count && pieceCounts % tick === 0)
                            break;
                    }

                    // 如果不能整除，则补充空数据
                    if (tick === 1) {
                        this.data.data.push({ hidden: true });
                        pieceCounts++;
                    } else
                    break;
                }
            }

            _xAxis.tick = tick;
            _xAxis.data = [];
            this.data.data.forEach((item, index) =>
                index % tick === 0 && _xAxis.data.push(item[this.data.xAxis.key]));
        }

        //
        // 确定纵坐标
        //
        {
            const _yAxis = this.data._yAxis;

            // 如果没有设置最小值和最大值，则寻找
            if (!isNaN(this.data.yAxis.min))
                _yAxis.min = this.data.yAxis.min;
            else {
                _yAxis.min = Math.min(...this.data.series.map((sery) =>
                    Math.min(...this.data.data.map((item) =>
                        !isNaN(item[sery.key]) ? item[sery.key] : Infinity)
                    )
                )); // 支持空数据
            }
            if (!isNaN(this.data.yAxis.max))
                _yAxis.max = this.data.yAxis.max;
            else {
                _yAxis.max = Math.max(...this.data.series.map((sery) =>
                    Math.max(...this.data.data.map((item) =>
                        !isNaN(item[sery.key]) ? item[sery.key] : -Infinity)
                    )
                )); // 支持空数据
            }

            _yAxis.count = this.data.yAxis.count || 8;
            const tick = _.roundToFirst((_yAxis.max - _yAxis.min) / _yAxis.count) || 1;
            const fixedCount = _.getFixedCount(tick);
            _yAxis.min = Math.floor(_yAxis.min / tick) * tick;
            _yAxis.max = Math.ceil(_yAxis.max / tick) * tick;

            // 如果最小值和最大值相等，则强行区分
            if (_yAxis.min === _yAxis.max)
                _yAxis.max = _yAxis.min + _yAxis.count;

            _yAxis.data = [];
            for (let i = _yAxis.min; i <= _yAxis.max; i += tick)
                _yAxis.data.push(i.toFixed(fixedCount)); // 防止+的时候出现无限小数的情况
        }

        setTimeout(() => {
            this._getSize();
            this.$update();
        });

        this.supr();
    },
    _getD(sery, type) {
        if (!this.data._width || !this.data._height || !this.data.data || !this.data._xAxis.data.length || !this.data._yAxis.data.length)
            return;
        if (this.data.data.length <= 1) // 一个点无需绘制线条
            return;

        const width = this.data._width;
        const height = this.data._height;
        const delta = width / (this.data.data.length - 1) / 2;

        const points = this.data.data.map((item, index) => {
            if (isNaN(item[sery.key])) // 处理空数据的情况
                return null;
            else {
                return [
                    width * index / (this.data.data.length - 1),
                    height * (1 - (item[sery.key] - this.data._yAxis.min) / (this.data._yAxis.max - this.data._yAxis.min)),
                ];
            }
        });
        points.push(null); // 起始点也可以看作间断结束，最后一个null看作间断开始

        const cmds = [];
        let discontinued = true;
        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            let cmd = '';

            if (!point) {
                if (!discontinued) {    // discontinue start
                    discontinued = true;
                    if (type === 'area')
                        cmd = 'V ' + height;
                }
            } else {
                const pointStr = point.join(',');
                if (discontinued) {    // discontinue end
                    discontinued = false;
                    if (type !== 'area')
                        cmd = 'M ' + pointStr;
                    else {
                        const bottomPointStr = [point[0], height].join(',');
                        cmd = `M ${bottomPointStr} L ${pointStr}`;
                    }

                    const nextPoint = points[i + 1];
                    if (this.data.smooth && nextPoint) {
                        const helperPointStr = [point[0] + delta, point[1]].join(',');
                        const nextHelperPointStr = [nextPoint[0] - delta, nextPoint[1]].join(',');
                        cmd += ` C ${helperPointStr} ${nextHelperPointStr} ` + nextPoint.join(',');
                        i++;
                    }
                } else {
                    if (!this.data.smooth)
                        cmd = 'L ' + pointStr;
                    else {
                        const helperPointStr = [point[0] - delta, point[1]].join(',');
                        cmd = `S ${helperPointStr} ${pointStr}`;
                    }
                }
            }

            cmds.push(cmd);
        }

        return cmds.join(' ');
    },
    // 需要特殊处理存在隐藏线和断点的tooltip显示的位置问题
    _getTopOne(item) {
        return Math.max(...this.data.series.map((sery) => !sery.hidden && item[sery.key] ? item[sery.key] : -Infinity));
    },
    format(value) {
        return value;
    },
});

export default LineChart;
