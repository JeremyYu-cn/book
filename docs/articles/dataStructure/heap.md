## 堆(heap)

## 完全二叉树

二叉树按照从上往下，从左往右顺序进行编号

![完全二叉树](https://img.yzmblog.top/book/complish_binary_tree.png)

## 大根堆和小根堆

### 大根堆

- 定义：自顶向下，从左到右，根节点数值最大，子节点必须比根节点数值小，以此类推

![大根堆](https://img.yzmblog.top/book/big_root_heap.png)

- 创建大根堆

```javascript
var arr = [1, 8, 7, 3, 4, 10];

function createBigRootHeap(arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    res.push(arr[i]);
    if (res.length > 1) {
      let idx = res.length - 1;
      while (idx > 0) {
        const tmpIdx = Math.floor(idx / 2);
        if (res[tmpIdx] < res[idx]) {
          const tmp = res[tmpIdx];
          res[tmpIdx] = res[idx];
          res[idx] = tmp;
        }
        idx = tmpIdx;
      }
    }
  }
  return res;
}

createBigRootHeap(arr); // [10, 8, 7, 3, 1, 4]
```

### 小根堆

- 定义：与大根堆相反，根节点最小，子节点比父节点要大

![小根堆](https://img.yzmblog.top/book/small_root_heap.png)

## 优先队列

- 定义：优先队列也是一种抽象数据类型。优先队列中的每个元素都有优先级，而优先级高（或者低）的将会先出队，而优先级相同的则按照其在优先队列中的顺序依次出队。

- 实现

```javascript
// 根据数值大小定义优先队列
class MyHeap {
  constructor(sortFun = (a, b) => a - b) {
    this.arr = [];
    this.sort = sortFun;
  }

  /** 插入队列 */
  push(val) {
    const idx = this.binaryFind(val);
    this.arr.splice(idx, 0, val);
    console.log(this.arr);
  }
  /** 删除队列中队头元素 */
  delete() {
    this.arr.splice(0, 1);
  }

  binaryFind(val) {
    let left = 0;
    let right = this.arr.length;
    while (left < right) {
      const mid = (left + right) >> 1;
      if (this.sort(this.arr[mid], val) > 0) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }
    return left;
  }
}
```
