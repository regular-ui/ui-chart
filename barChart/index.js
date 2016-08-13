import { Component } from 'rgui-ui-base';
import template from './index.rgl';

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
            data: [
                { week: '星期一', number: 150 },
                { week: '星期二', number: 300 },
                { week: '星期三', number: 200 },
                { week: '星期四', number: 0 },
                { week: '星期五', number: 74 },
                { week: '星期六', number: 532 },
                { week: '星期日', number: 420 },
            ],
            xAxis: {
                key: 'week',
            },
            yAxis: {
                min: 0,
                max: 800,
            },
            series: [{
                name: 'Select',
                key: 'number',
            }],
            _xAxis: [],
            _yAxis: [100, 200, 300, 400, 500, 600, 700, 800],
        }, this.data);
        this.supr();
    },
});

export default BarChart;
