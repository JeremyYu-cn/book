 接下来看一下浏览器中`WebAssembly`API的用法。

## 浏览器加载wasm流程

我们从上一节的`getModules`方法来看看wsam的加载流程

```javascript

// 获取wsam模块
async function getModules(url, imports = {}) {
    // 获取wsam文件数据
    const data = await fetch(url);
    // 将数据转为ArrayBuffer
    const arrayBuffer = await data.arrayBuffer()
    // 将ArrayBuffer编译成一个Module
    const module = await WebAssembly.compile(arrayBuffer);
    // 实例化Module
    return WebAssembly.instantiate(module, imports);
}

```

可以看到，加载wsam分为三步：

1. 从网络上获取wasm文件，并将数据转换成ArrayBuffer(注意：wsam获取严格遵循同源策略) 

2. 将ArrayBuffer二进制码编译成`浏览器Module`

3. 最后实例化编译出来的Module


![image.png](https://img.yzmblog.top/blog/wsam_04.png)

接下来从编译所需要的API来详细说明一下编译的流程。

## WebAssembly编译

### 1.compile

`WebAssembly.compile`的作用就是将从网络获取回来的**wsam**二进制码编译成Module，它只接收一个byte的参数。

```javascript
WebAssembly.compile(bytes)
```

### 2.instantiate & Instance

`instantiate` 和 `Instance` 都是可以实例化模块，方法接收两个参数：Module和imports


```javascript
const moduleA = WebAssembly.instantiate(module, imports);

const moduleB = new WebAssembly.Instance(module, imports);
```

* Module: 从`WebAssymbly.compile`编译出来的模块。
* imports: 这个模块需要**引入**的函数，imports非常重要，这个关乎到我们的Module能不能正常编译成功。

再来写一个需要分配内存的方法
```c
#include <stdlib.h>
#include <string.h>

char *helloworld()
{
  char* c = (char *)malloc(14);
  strcpy(c, "hello world\n");
  return c;
}
```

![image.png](https://img.yzmblog.top/blog/wsam_05.png)

可以看到，编译到wat后会出现`import "env" "malloc"`的代码。这些模块是需要我们在实例化时的`imports`导入的，如果在实例化中没有import这些模块，则会抛出异常。

```javascript
const mem = new WenAssembly.Memory({
    initial: 100,
})
const module = WebAssembly.instantiate(module, {
    env: {
        // malloc模块可以在 https://cdn.rawgit.com/guybedford/wasm-intro/a1e23253/7-importing-memory/memory.wasm 中找到
        malloc: () => {},
        memory: mem,
    }
})
```

那么，我们又该如何找到这些模块呢？

对于这些公共模块，我们可以通过CDN找到，比如malloc模块就在`memory`模块中能找到。

### 3. instantiateStreaming

`instantiateStreaming`方法是`toArrayBuffer`，`compile`和`instantiate`的集合，一个方法就包含这三步

```javascript
const module = WebAssembly.instantiateStreaming(fetch('xxx.wsam'), imports);
```

### 4.Memory

**Memory**用于表示编译模块使用的堆，在JS中他是一种**可调整大小的**`ArrayBuffer`的形式存在的。上文中也可以看到，在声明一个模块都需要import一个内存实例到模块中。

```javascript
const mem = new WebAssembly.Memory({ 
    // 初始化内存
    initial: 1,
    // 最大内存
    maximum: 100,
    // 内存是否可共享
    share: true,
})
```

`initial`，`maximum`内存的单位是`WebAssembly pages`，固定每页是`64KB`。最大可支持`6.4MB`

### 参考

1. [WebAssembly](https://www.wasm.com.cn/getting-started/js-api)
2. [MDN](https://developer.mozilla.org/en-US/docs/WebAssembly)
