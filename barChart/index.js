import { Component } from 'rgui-ui-base';
import contentTemplate from './index.rgl';
import Chart from '../chart';
import _ from '../util';

/**
 * @class Chart
 * @extend Component
 * @param {object}                  options.data                     =  绑定属性
 * @param {string='Hello World'}    options.data.message            <=> 消息
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
 */
const BarChart = Chart.extend({
    name: 'barChart',
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
            'class': 'm-barChart',
            data: [],
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
        const tick = _.roundToFirst((_yAxis.max - _yAxis.min)/COUNT);
        _yAxis.min = Math.floor(_yAxis.min/tick)*tick;
        _yAxis.max = Math.ceil(_yAxis.max/tick)*tick;

        _yAxis.data = [];
        for (let i = _yAxis.min; i <= _yAxis.max; i += tick)
            _yAxis.data.push(i);

        this.$update();
    },
});

export default BarChart;
