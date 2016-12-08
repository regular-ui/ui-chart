## 示例
### 基本形式

<div class="m-example"></div>

```xml
<chart title="图表" />
```

### 边框

<div class="m-example"></div>

```xml
<chart title="图表" border />
```

### 图例

<div class="m-example"></div>

```xml
<chart title="图表" border
    series={series} />
```

```javascript
let component = new RGUI.Component({
    template,
    data: {
        // 本来应该直接在模板中书写，Regular有bug
        series: [{ key: 'readings', name: '阅读数' }, { key: 'stars', name: '点赞数' }, { key: 'collections', name: '收藏数' }],
    },
});
```
