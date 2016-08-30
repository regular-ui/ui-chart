import { Component } from 'rgui-ui-base';
import template from './index.rgl';

/**
 * @class Chart
 * @extend Component
 * @param {object}                  options.data                     =  绑定属性
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
 */
const Chart = Component.extend({
    name: 'chart',
    template,
    /**
     * @protected
     * @override
     */
    config() {
        this.defaults({
            width: '100%',
            height: '400px',
        });
        this.supr();
    },
});

export default Chart;
