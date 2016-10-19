import { Component } from 'rgui-ui-base';
import contentTemplate from './index.rgl';
import Chart from '../chart';
import _ from '../util';

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
            // @inherited height: '400px',
            // @inherited title: '',
            // @inherited titleTemplate: '',
            _width: 800,
            _height: 400,
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
    watch() {
        // this.$watch('data', (newValue, oldValue) {
        //     this.data.data.ser
        // });
    },
    /**
     * @protected
     * @override
     */
    init() {
        this.supr();
        setTimeout(() => {
            this.draw();
            this.$update();
        });
    },
    draw() {
        if (!this.data.data || !this.data.data.length)
            return;

        this.data._width = this.$refs.grid.offsetWidth || 800;
        this.data._height = this.$refs.grid.offsetHeight || 400;

        //
        // 确定横坐标
        //
        const _xAxis = this.data._xAxis;

        _xAxis.count = this.data.xAxis.count || 12;
        if (this.data.data.length <= _xAxis.count)
            _xAxis.data = this.data.data.map((item) => item[this.data.xAxis.key]);
        else { // 目前只支持合数
            const TICKES = [2, 3, 4, 5, 6, 7, 8, 10, 15, 20, 30, 40, 50, 100, 200, 500, 1000, 1];
            let tick;
            for (let i = 0; i < TICKES.length; i++) {
                tick = TICKES[i];
                if (this.data.data.length/tick <= _xAxis.count && this.data.data.length%tick === 0)
                    break;
            }
            _xAxis.data = [];
            this.data.data.forEach((item, index) => {
                if (index%tick === 0)
                    _xAxis.data.push(item[this.data.xAxis.key]);
            });
        }

        //
        // 确定纵坐标
        //
        const _yAxis = this.data._yAxis;

        // 如果没有设置最小值和最大值，则寻找
        if (this.data.yAxis.min !== undefined)
            _yAxis.min = this.data.yAxis.min;
        else {
            _yAxis.min = Math.min.apply(null, this.data.series.map((sery) =>
                Math.min.apply(null, this.data.data.map((item) => item[sery.key]))
            ));
        }
        if (this.data.yAxis.max !== undefined)
            _yAxis.max = this.data.yAxis.max;
        else {
            _yAxis.max = Math.max.apply(null, this.data.series.map((sery) =>
                Math.max.apply(null, this.data.data.map((item) => item[sery.key]))
            ));
        }

        _yAxis.count = this.data.yAxis.count || 8;
        const tick = _.roundToFirst((_yAxis.max - _yAxis.min)/_yAxis.count) || 1;
        _yAxis.min = Math.floor(_yAxis.min/tick)*tick;
        _yAxis.max = Math.ceil(_yAxis.max/tick)*tick;

        _yAxis.data = [];
        for (let i = _yAxis.min; i <= _yAxis.max; i += tick)
            _yAxis.data.push(i);

        this.supr();
    },
    _getD(sery, type) {
        if (!this.data.data || !this.data._xAxis.data.length || !this.data._yAxis.data.length)
            return;

        const width = this.data._width;
        const height = this.data._height;
        const delta = width/(this.data.data.length - 1)/2;

        const cmds = this.data.data.map((item, index) => {
            const x = width*index/(this.data.data.length - 1);
            const y = height*(1 - (item[sery.key] - this.data._yAxis.min)/this.data._yAxis.max);

            if (!this.data.smooth)
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
