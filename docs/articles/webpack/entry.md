## webpack 概念

在学习 webpack 之前，首先要了解一下什么是`webpack`。通俗地讲，`webpack`是一个静态模块打包工具，正如 webpack 官网中的图一样，实质上是将一个`入口js文件`的所有依赖文件合并成一个或多个**bundle**文件。是我们实现前端工程化的一个重要工具。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8f8e5ed4994047eb8899cdaba33fba27~tplv-k3u1fbpfcp-watermark.image?)

## 入口（Entry）

入口就是需要打包文件的入口，他**必须**是`js`文件，定义入口的方法很简单，对应在`webpack`配置文件中的`entry`字段，一个最简单的使用方法：

```typescript
// webpack.config.ts

export default {
  entry: './src/index.js',
};
```

上面代码定义了 webpack 打包的入口。`entry`也可以是多个入口文件打包成一个。

```typescript
// webpack.config.ts

export default {
  entry: ['./src/index1.js', './src/index2.js'],
  output: {
    filename: 'bundle.js',
  },
};
```

上面代码的意思是：entry 写入了`index1.js`和`index2.js`两个文件，将这两个文件`合并`后输出到`bundle.js`上。

举个例子：

```typescript
// entry1.js
function test1() {
  console.log('test1');
}
test1();

// entry2.js
function test2() {
  console.log('test2');
}
test2();

// webpack.config.js
const path = require('path');

module.exports = {
  mode: 'production',
  entry: [
    path.resolve(__dirname, 'src', 'entry.js'),
    path.resolve(__dirname, 'src', 'entry1.js'),
  ],
  output: {
    filename: 'bundle.js',
  },
};
```

执行打包后输出的是

```javascript
(() => {
  'use strict';
  console.log('test1'), console.log('test2');
})();
```

可见，输出后的文件是将入口的文件都打包到一个文件中。

除了上述的两种方法，`entry`还可以传入一个对象，对象相比前两种入口的方式可能会比较复杂，但是用对象作为入口是最容易扩展的。语法如下：

```javascript
// webpack.config.js
const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    app: path.resolve(__dirname, 'src', 'entry.js'),
    lib: {
      import: path.resolve(__dirname, 'src', 'entry1.js'),
    },
  },
  output: {
    filename: 'bundle.js',
  },
};
```

可以看到在 entry 中放入两个入口文件，他们的 key 分别为`app`和`lib`；`app`的值是入口文件的路径；`lib`的值则是一个对象。

对象的参数如下

| 字段       | 类型                 | 作用                                                                  |
| ---------- | -------------------- | --------------------------------------------------------------------- |
| `dependOn` | string\|Array string | 当前入口所依赖的入口。在此入口被加载之前必须先加载该入口              |
| `filename` | string               | 输出的文件名                                                          |
| `import`   | string               | 入口文件地址                                                          |
| `library`  | string               | 为当前入口构建一个库                                                  |
| `runtime`  | string\|boolean      | 运行时文件的文件名，如果设置了，打包的时候会创建一个运行时 chunk 文件 |

## 动态 entry

上述的几种入口方式都是`静态`(固定传入)的，如果我们想要动态传入入口文件，这时我们的`entry`需要传入一个`函数`，该函数会在 webpack 的`make`事件中调用（make 事件是 webpack 生命周期的钩子函数，后面会说到），调用如下：

```typescript
// webpack.config.js
const path = require('path');

const getEntry = () => {
  return {
    app: path.resolve(__dirname, 'src', 'entry.js'),
    lib: {
      import: path.resolve(__dirname, 'src', 'entry1.js'),
      // runtime: false,
      chunkLoading: 'jsonp',
      asyncChunks: true,
    },
  };
};

module.exports = {
  mode: 'production',
  entry: getEntry,
  output: {
    filename: '[name].bundle.js',
  },
};
```

我们也可以在 entry 中放入异步函数

```typescript
// webpack.config.js
const path = require('path');

const getEntry = () => {
  return new Promise((resolve) => {
    resolve({
      app: path.resolve(__dirname, 'src', 'entry.js'),
      lib: {
        import: path.resolve(__dirname, 'src', 'entry1.js'),
        // runtime: false,
        chunkLoading: 'jsonp',
        asyncChunks: true,
      },
    });
  });
};

module.exports = {
  mode: 'production',
  entry: getEntry,
  output: {
    filename: '[name].bundle.js',
  },
};
```

函数可以返回对象，字符串或数组，在函数中我们可以根据需要动态地获取入口文件。

## 总结

本文详细讲了 webapck 基本配置的`entry`属性。  
entry 入参数的方法

- 可以直接传入一个入口文件路径，
- 可以传入一个数组（多个入口文件）并合并成一个。
- 可以传入一个对象扩展入口信息
- 可以传入一个函数用于动态获取入口文件

文章是`从零开始学习webpack系列`的第一篇，下一节或其他章节可以看下面 👇：

从零开始学习 webpack5.x(二)
