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
            _xAxis: [],
            _yAxis: {
                data: [],
            },
            tooltipTemplate: '',
        });
        this.supr();
        this.watch();
        this.draw();
    },
    watch() {
        // this.$watch('data', (newValue, oldValue) {
        //     this.data.data.ser
        // });
    },
    draw() {
        const _yAxis = this.data._yAxis;
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

        const COUNT = 8;
        const tick = _.roundToFirst((_yAxis.max - _yAxis.min)/COUNT) || 1;
        _yAxis.min = Math.floor(_yAxis.min/tick)*tick;
        _yAxis.max = Math.ceil(_yAxis.max/tick)*tick;

        _yAxis.data = [];
        for (let i = _yAxis.min; i <= _yAxis.max; i += tick)
            _yAxis.data.push(i);

        this.supr();
    },
    _getD(sery, type) {
        if (!this.data.data)
            return;

        const delta = 50;

        const cmds = this.data.data.map((item, index) => {
            const x = 670*index/6;
            const y = 340*(1 - (item[sery.key] - this.data._yAxis.min)/this.data._yAxis.max);

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
            cmds.push('V 340');
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
