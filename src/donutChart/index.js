import contentTemplate from './index.rgl';
import Chart from '../chart';

/**
 * @class DonutChart
 * @extends PieChart
 * @param {Object}                  options.data                     =  绑定属性
 * @param {string='100%'}           options.data.width               => 图表宽度
 * @param {string='480px'}          options.data.height              => 图表高度
 * @param {string=''}               options.data.title               => 标题
 * @param {string=''}               options.data.titleTemplate      @=> 标题模板
 * @param {string=''}               options.data.tooltipTemplate    @=> 工具提示模板
 * @param {Array}                   options.data.data                => 数据。如果为`undefined`，表示数据正在加载；如果为`[]`，表示数据为空。
 * @param {Array=[]}                options.data.series              => 序列信息
 * @param {boolean=false}           options.data.border              => 是否显示边框
 * @param {boolean=true}            options.data.legend              => 是否显示图例
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string='m-donutChart'}   options.data.class               => 补充class
 */
const DonutChart = Chart.extend({
    name: 'donutChart',
    /**
     * @protected
     * @override
     */
    config() {
        this.defaults({
            contentTemplate,
            class: 'm-donutChart',
            RADIUS: 30,
        });
        this.supr();
    },
    watch() {
        this.$watch('data', (data) => {
            this.data.series = data;
            data && data.reduce((prev, current) => {
                current._pos = prev._pos + prev.percent;
                return current;
            }, { percent: 0, _pos: 0 });
        });
    },
    _getPosition(pos, length) {
        pos = pos || 0;
        length = length || this.data.RADIUS;
        const arc = Math.PI * 2 * pos * 0.01;
        return { x: length * Math.sin(arc), y: -length * Math.cos(arc) };
    },
    _getD(item) {
        const start = this._getPosition(item._pos);
        const end = this._getPosition(item._pos + item.percent);

        let d = '';
        d += 'M ';
        d += start.x + ',' + start.y;
        d += ' A ' + this.data.RADIUS + ',' + this.data.RADIUS + ' 0 ';
        d += item.percent > 50 ? 1 : 0;
        d += ' 1 ';
        d += end.x + ',' + end.y;

        return d;
    },
    _onMouseOver(item) {
        this.data.current = item;
    },
});

export default DonutChart;
