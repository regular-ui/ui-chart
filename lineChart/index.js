import { Component } from 'rgui-ui-base';
import contentTemplate from './index.rgl';
import Chart from '../chart';
import _ from '../util';

const TICKES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 30, 40, 50, 100, 200, 500, 1000, 1];

/**
 * @class LineChart
 * @extend Chart
 * @param {object}                  options.data                     =  绑定属性
 * @param {string='Hello World'}    options.data.message            <=> 消息
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
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
            'class': 'm-lineChart',
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
        this.watch();
    },
    /**
     * @protected
     * @override
     */
    watch() {
        // this.$watch('data', (data) {
        //     this.data.data.ser
        // });
    },
    /**
     * @protected
     * @override
     */
    init() {
        this.supr();
        this.draw();
    },
    /**
     * @private
     */
    _getSize() {
        this.data._width = this.$refs.grid && this.$refs.grid.offsetWidth;
        this.data._height = this.$refs.grid && this.$refs.grid.offsetHeight;
    },
    draw() {
        if (!this.data.data || !this.data.data.length)
            return;

        //
        // 确定横坐标
        //
        {
            const _xAxis = this.data._xAxis;
            _xAxis.count = this.data.xAxis.count || 12;
            let pieceCounts = this.data.data.length - 1;
            let tick = 1;
            while (!(pieceCounts/tick <= _xAxis.count && pieceCounts%tick === 0)) {
                for (let i = 0; i < TICKES.length; i++) {
                    tick = TICKES[i];
                    if (pieceCounts/tick <= _xAxis.count && pieceCounts%tick === 0)
                        break;
                }

                // 如果不能整除，则补充空数据
                if (tick === 1) {
                    this.data.data.push({});
                    pieceCounts++;
                } else
                    break;
            }

            _xAxis.tick = tick;
            _xAxis.data = [];
            this.data.data.forEach((item, index) =>
                index%tick === 0 && _xAxis.data.push(item[this.data.xAxis.key]));
        }

        //
        // 确定纵坐标
        //
        {
            const _yAxis = this.data._yAxis;

            // 如果没有设置最小值和最大值，则寻找
            if (this.data.yAxis.min !== undefined)
                _yAxis.min = this.data.yAxis.min;
            else {
                _yAxis.min = Math.min.apply(null, this.data.series.map((sery) =>
                    Math.min.apply(null, this.data.data.map((item) =>
                        item[sery.key] !== undefined ? item[sery.key] : Infinity)))); // 支持空数据
            }
            if (this.data.yAxis.max !== undefined)
                _yAxis.max = this.data.yAxis.max;
            else {
                _yAxis.max = Math.max.apply(null, this.data.series.map((sery) =>
                    Math.max.apply(null, this.data.data.map((item) =>
                        item[sery.key] !== undefined ? item[sery.key] : -Infinity)))); // 支持空数据
            }

            _yAxis.count = this.data.yAxis.count || 8;
            let tick = this.data.yAxis.tick || _.roundToFirst((_yAxis.max - _yAxis.min)/_yAxis.count) || 1;
            if (this.data.yAxis.minTick && tick < this.data.yAxis.minTick)
                tick = this.data.yAxis.minTick;
            _yAxis.min = Math.floor(_yAxis.min/tick)*tick;
            _yAxis.max = Math.ceil(_yAxis.max/tick)*tick;

            // 如果最小值和最大值相等，则强行区分
            if (_yAxis.min === _yAxis.max)
                _yAxis.max = _yAxis.min + 5;

            _yAxis.data = [];
            for (let i = _yAxis.min; i <= _yAxis.max; i += tick) {
                if (i > 0 && i < 1)
                    i = +i.toFixed((tick + '').length - 2);
                _yAxis.data.push(i);
            }
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

        const width = this.data._width;
        const height = this.data._height;
        const delta = width/(this.data.data.length - 1)/2;

        const cmds = this.data.data.map((item, index) => {
            const x = width*index/(this.data.data.length - 1);
            const y = height*(1 - (item[sery.key] - this.data._yAxis.min)/this.data._yAxis.max);

            if (isNaN(y)) // 处理空数据的情况
                return '';
            else if (!this.data.smooth)
                return `L ${x},${y}`;
            else {
                const x2 = x - delta;
                return `S ${x2},${y} ${x},${y}`;
            }
        });

        if (!this.data.smooth)
            cmds[0] = 'M ' + cmds[0].slice(2);
        else {
            const [x, y] = cmds[0].split(' ')[2].split(',');
            const x1 = x + delta;
            cmds[0] = `M ${x},${y}`;
            cmds[1] = `C ${x1},${y} ` + cmds[1].slice(2);
        }

        if (type === 'area') {
            cmds.push('V ' + height);
            cmds.push('H 0');
            cmds.push('Z');
        }

        return cmds.join(' ');
    },
    format(value) {
        return value;
    },
});

export default LineChart;
