## 示例
### 折线图

<div class="m-example"></div>

```xml
<lineChart
    xAxis={@({ key: 'week' })}
    yAxis={@({ min: 0 })}
    series={@([{ key: 'number', name: 'Test' }])}
    data={data} />
```

```javascript
let component = new RGUI.Component({
    template,
    data: {
        data: [
            { week: '星期一', number: 150 },
            { week: '星期二', number: 300 },
            { week: '星期三', number: 0 },
            { week: '星期四', number: 200 },
            { week: '星期五', number: 74 },
            { week: '星期六', number: 532 },
            { week: '星期日', number: 420 },
        ],
    },
});
```

### 曲线图

<div class="m-example"></div>

```xml
<lineChart smooth
    xAxis={@({ key: 'week' })}
    yAxis={@({ min: 0 })}
    series={@([{ key: 'number', name: 'Test' }])}
    data={data} />
```

```javascript
let component = new RGUI.Component({
    template,
    data: {
        data: [
            { week: '星期一', number: 150 },
            { week: '星期二', number: 300 },
            { week: '星期三', number: 0 },
            { week: '星期四', number: 200 },
            { week: '星期五', number: 74 },
            { week: '星期六', number: 532 },
            { week: '星期日', number: 420 },
        ],
    },
});
```

### 填充下方区域

<div class="m-example"></div>

```xml
<lineChart smooth fill
    xAxis={@({ key: 'week' })}
    yAxis={@({ min: 0 })}
    series={@([{ key: 'number', name: 'Test' }])}
    data={data} />
```

```javascript
let component = new RGUI.Component({
    template,
    data: {
        data: [
            { week: '星期一', number: 150 },
            { week: '星期二', number: 300 },
            { week: '星期三', number: 0 },
            { week: '星期四', number: 200 },
            { week: '星期五', number: 74 },
            { week: '星期六', number: 532 },
            { week: '星期日', number: 420 },
        ],
    },
});
```
