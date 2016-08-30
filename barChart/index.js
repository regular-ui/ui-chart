import { Component } from 'rgui-ui-base';
import template from './index.rgl';
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
const BarChart = Component.extend({
    name: 'barChart',
    template,
    /**
     * @protected
     * @override
     */
    config() {
        this.data = Object.assign({
            data: [],
            xAxis: {
                key: 'week',
            },
            yAxis: {
                min: 'auto',
                max: 'auto',
            },
            series: [{
                name: 'Select',
                key: 'number',
            }],
            _xAxis: [],
            _yAxis: {
                data: [],
            },
        }, this.data);
        this.supr();
        this.watch();
    },
    watch() {
        // this.$watch('data', (newValue, oldValue) {
        //     this.data.data.ser
        // });
    },
    init() {
        const _yAxis = this.data._yAxis;
        _yAxis.min = Math.min.apply(null, this.data.series.map((sery) =>
            Math.min.apply(null, this.data.data.map((item) => item[sery.key]))
        ));
        _yAxis.max = Math.max.apply(null, this.data.series.map((sery) =>
            Math.max.apply(null, this.data.data.map((item) => item[sery.key]))
        ));

        const COUNT = 8;
        const tick = _.roundToFirst((_yAxis.max - _yAxis.min)/COUNT);
        _yAxis.min = Math.floor(_yAxis.min/tick)*tick;
        _yAxis.max = Math.ceil(_yAxis.max/tick)*tick;

        _yAxis.data = [];
        for (let i = _yAxis.min; i <= _yAxis.max; i += tick)
            _yAxis.data.push(i);

        console.log(_yAxis.data);
        this.$update();
    },
});

export default BarChart;
