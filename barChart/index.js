import { Component } from 'rgui-ui-base';
import contentTemplate from './index.rgl';
import Chart from '../chart';
import _ from '../util';

/**
 * @class BarChart
 * @extend Chart
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
            // @inherited height: '480px',
            // @inherited title: '',
            // @inherited titleTemplate: '',
            contentTemplate,
            'class': 'm-barChart',
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
        this.draw();
    },
    /**
     * @protected
     * @override
     */
    watch() {
        // this.$watch('data', (newValue, oldValue) {
        //     this.data.data.ser
        // });
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
            // 柱状图数据全部显示，暂不考虑收缩间隔的情况
            _xAxis.data = this.data.data.map((item) => item[this.data.xAxis.key]);
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

            // 如果最小值和最大值相等，则强行区分
            if (_yAxis.min === _yAxis.max)
                _yAxis.max = _yAxis.min + 1;

            _yAxis.data = [];
            for (let i = _yAxis.min; i <= _yAxis.max; i += tick)
                _yAxis.data.push(i);
        }

        this.supr();
    },
    format(value) {
        return value;
    },
});

export default BarChart;
