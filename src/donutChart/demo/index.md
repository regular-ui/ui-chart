## 示例
### 基本形式

<div class="m-example"></div>

```xml
<donutChart data={data} />
```

```javascript
let component = new RGUI.Component({
    template,
    data: {
        data: [
            {percent: 12, key: '1', name: 'sector1'},
            {percent: 20, key: '2', name: 'sector2'},
            {percent: 30, key: '3', name: 'sector3'},
            {percent: 18, key: '4', name: 'sector4'},
            {percent: 20, key: '5', name: 'sector5'},
        ],
    },
});
```

### 隐藏图例

<div class="m-example"></div>

```xml
<donutChart legend={false} data={data} />
```

```javascript
let component = new RGUI.Component({
    template,
    data: {
        data: [
            {percent: 12, key: '1', name: 'sector1'},
            {percent: 20, key: '2', name: 'sector2'},
            {percent: 30, key: '3', name: 'sector3'},
            {percent: 18, key: '4', name: 'sector4'},
            {percent: 20, key: '5', name: 'sector5'},
        ],
    },
});
```

### 其它

<div class="m-example"></div>

```xml
<donutChart border title="每星期访问量" data={data} />
```

```javascript
let component = new RGUI.Component({
    template,
    data: {
        data: [
            {percent: 12, key: '1', name: 'sector1'},
            {percent: 20, key: '2', name: 'sector2'},
            {percent: 30, key: '3', name: 'sector3'},
            {percent: 18, key: '4', name: 'sector4'},
            {percent: 20, key: '5', name: 'sector5'},
        ],
    },
});
```
