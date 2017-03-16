## 示例
### 基本形式

<div class="m-example"></div>

```xml
<barChart
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

### 堆叠数据

<div class="m-example"></div>

```xml
<barChart stack
    xAxis={@({ key: 'week' })}
    yAxis={@({ min: 0 })}
    series={@(series)}
    data={data} />
```

```javascript
let component = new RGUI.Component({
    template,
    data: {
        series: [{ key: 'rds' }, { key: 'ncr' }, { key: 'nce' }],
        data: [
            { week: '星期一', rds: 150, ncr: 200, nce: 50 },
            { week: '星期二', rds: 300, ncr: 340, nce: 20 },
            { week: '星期三', rds: 28, ncr: 56, nce: 28 },
            { week: '星期四', rds: 200, ncr: 78, nce: 40 },
            { week: '星期五', rds: 74, ncr: 100, nce: 74 },
            { week: '星期六', rds: 532, ncr: 200, nce: 32 },
            { week: '星期日', rds: 420, ncr: 260, nce: 20 },
        ],
    },
});
```

### 隐藏图例

<div class="m-example"></div>

```xml
<barChart legend={false}
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

### 其它

<div class="m-example"></div>

```xml
<barChart border title="每星期访问量"
    xAxis={@({ key: 'week' })}
    yAxis={@({ min: 0, name: '个' })}
    series={@([{ key: 'number', name: '访问量' }])}
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
