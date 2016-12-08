import { Component } from 'rgui-ui-base';
import template from './index.rgl';

/**
 * @class Chart
 * @extend Component
 * @param {object}                  options.data                     =  绑定属性
 * @param {string='100%'}           options.data.width               => 图表宽度
 * @param {string='480px'}          options.data.height              => 图表高度
 * @param {string=''}               options.data.title               => 标题
 * @param {string=''}               options.data.titleTemplate      @=> 标题模板
 * @param {string=''}               options.data.contentTemplate    @=> 内容模板，继承中使用
 * @param {Array}                   options.data.data                => 数据。如果为`undefined`，表示数据正在加载；如果为`[]`，表示数据为空。
 * @param {boolean=false}           options.data.border              => 是否显示边框
 * @param {boolean=true}            options.data.legend              => 是否显示图例
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
            height: '480px',
            title: '',
            titleTemplate: '',
            contentTemplate: '',
            data: undefined,
            border: false,
            legend: true,
            // autoDraw: true,
        });
        this.supr();
        this.watch();
    },
    /**
     * @protected
     * @override
     */
    watch() {
        // 自动绘制
        this.$watch('data', (data) => {
            if (data && data.length)
                this.draw();
        });
    },
    /**
     * @protected
     */
    draw() {
        this.$emit('draw', {
            sender: this,
        });
    },
});

export default Chart;
