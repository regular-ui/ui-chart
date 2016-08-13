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
const Chart = Component.extend({
    name: 'chart',
    template,
    /**
     * @protected
     * @override
     */
    config() {
        this.data = Object.assign({
            message: 'Hello World',
        }, this.data);
        this.supr();
    },
    /**
     * @method toggle(open) 展开/收起
     * @public
     * @param  {boolean} open 展开/收起状态。如果无此参数，则在两种状态之间切换。
     * @return {void}
     */
    _onInput($event) {
        this.$emit('input', $event);
    },
});

export default Chart;
