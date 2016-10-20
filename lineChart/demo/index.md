## 示例
### 折线图

<div class="m-example"></div>

```xml
<lineChart
    xAxis={@({ key: 'week' })}
    yAxis={@({ min: 0 })}
    series={@([{ key: 'number' }])}
    data={data} />
```

```javascript
let component = new RGUI.Component({
    template,
    data: {
        data: [
            { week: '星期一', number: 150 },
            { week: '星期二', number: 300 },
            { week: '星期三', number: 28 },
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
    series={@([{ key: 'number' }])}
    data={data} />
```

```javascript
let component = new RGUI.Component({
    template,
    data: {
        data: [
            { week: '星期一', number: 150 },
            { week: '星期二', number: 300 },
            { week: '星期三', number: 28 },
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
    series={@([{ key: 'number' }])}
    data={data} />
```

```javascript
let component = new RGUI.Component({
    template,
    data: {
        data: [
            { week: '星期一', number: 150 },
            { week: '星期二', number: 300 },
            { week: '星期三', number: 28 },
            { week: '星期四', number: 200 },
            { week: '星期五', number: 74 },
            { week: '星期六', number: 532 },
            { week: '星期日', number: 420 },
        ],
    },
});
```

### 隐藏图例

<div class="m-example"></div>

```xml
<lineChart smooth legend={false}
    xAxis={@({ key: 'week' })}
    yAxis={@({ min: 0 })}
    series={@([{ key: 'number' }])}
    data={data} />
```

```javascript
let component = new RGUI.Component({
    template,
    data: {
        data: [
            { week: '星期一', number: 150 },
            { week: '星期二', number: 300 },
            { week: '星期三', number: 28 },
            { week: '星期四', number: 200 },
            { week: '星期五', number: 74 },
            { week: '星期六', number: 532 },
            { week: '星期日', number: 420 },
        ],
    },
});
```

### 隐藏图例

<div class="m-example"></div>

```xml
<lineChart border title="每星期访问量"
    xAxis={@({ key: 'week' })}
    yAxis={@({ min: 0, name: '个' })}
    series={@([{ key: 'number' }])}
    data={data} />
```

```javascript
let component = new RGUI.Component({
    template,
    data: {
        data: [
            { week: '星期一', number: 150 },
            { week: '星期二', number: 300 },
            { week: '星期三', number: 28 },
            { week: '星期四', number: 200 },
            { week: '星期五', number: 74 },
            { week: '星期六', number: 532 },
            { week: '星期日', number: 420 },
        ],
    },
});
```
