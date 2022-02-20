前面已经把 webpack 的基本配置都了解了一遍，我们已经可以运用基本配置将项目打包成我们想要的包，接下来深入了解一下 webpack 的其他配置和特性。

## HMR（模块热更新）

### HMR 概念

前面所配置`webpack`的项目，文件每一次修改都需要调用`webpack-cli`的命令去调用`webpack`来进行打包。当我们需要长时间不断地修改项目或者调试项目时。

显然每一次修改文件都需要手动地调用是非常麻烦的，所以，webpack 中有一个`HMR(模块热更新)`的功能来帮我们解决这个问题。

`HMR`的作用就是：当`entry`入口和其依赖的文件发生改变时，就会触发 webpack 的打包，将 entry 和相关依赖重新打包一遍。

### 使用 hmr

webpack 本身不支持 HMR，使用 HMR 需要安装[webpack-dev-server](https://github.com/webpack/webpack-dev-server)或者其他支持`HMR`的库。

安装完库后，在 webpack 配置中添加 devServer 字段:

```javascript
const path = require("path");
const MyPlugin = require("./src/plugin");

module.exports = {
  mode: "production",
  entry: [
    path.resolve(__dirname, "src", "entry.js"),
    path.resolve(__dirname, "src", "test2.js"),
  ],
  devServer: {
    static: "./dist",
    hot: true,
  },
  output: {
    filename: "bundle.js",
  },
  plugins: [new MyPlugin(path.resolve(__dirname, "src", "test.html"))],
};
```

配置完后执行`webpack-dev-server`命令，就会启动模块监听，并启动一个 web 服务，web 服务中的静态文件为`static`路径下的文件。

```shell
webpack-dev-server
<i> [webpack-dev-server] Project is running at:
<i> [webpack-dev-server] Loopback: http://localhost:8080/
<i> [webpack-dev-server] On Your Network (IPv4): http://192.168.3.3:8080/
<i> [webpack-dev-server] On Your Network (IPv6): http://[fe80::1]:8080/
<i> [webpack-dev-server] Content not from webpack is served from './dist' directory
<i> [webpack-dev-middleware] wait until bundle finished: /
asset bundle.js 115 KiB [emitted] [minimized] (name: main) 1 related asset
```

## 懒加载（按需加载）

### 懒加载概念

懒加载是指：将模块文件将他们**逻辑**地分开，当触发某个事件时再重新调用这些分开的模块。这样做的目的是减少初始打包文件打大小，加载网页加载速度。  
懒加载在项目庞大的时候非常有用。

### 使用懒加载

使用懒加载的原理很简单，就是利用[动态导入](https://github.com/tc39/proposal-dynamic-import)的方式，当触发某个事件时，动态导入模块代码。下面就来看一下我们在业务代码中如何调用懒加载

首先定义一个模块函数和一个主函数

```javascript
// test.js 模块函数
function test2() {
  console.log("test2");
}
export default test2;

// entry.js 主函数
window.onload = () => {
  var btn = document.querySelector("#btn");
  if (btn) {
    btn.onclick = async function () {
      const module = await import(/* webpackChunkName: "test" */ "./test2");
      module.default();
    };
  }
};
```

webpack 配置

```javascript
const path = require("path");
const htmlPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: [path.resolve(__dirname, "src", "entry.js")],
  devServer: {
    static: "./dist",
    hot: true,
  },
  output: {
    filename: "[name].bundle.js",
    clean: true,
  },
  plugins: [
    new htmlPlugin({
      template: path.resolve(__dirname, "src", "test.html"),
    }),
  ],
};
```

执行打包后会将动态引入的`test2.js`文件从 entry 中分离出来独立打包成一个文件，等待调用。

```shell
$ webpack
// asset main.bundle.js 2.64 KiB [emitted] [minimized] (name: main)
// asset index.html 214 bytes [emitted]
// asset test.bundle.js 164 bytes [emitted] [minimized] (name: test)
```

## Tree Shaking

### Tree Shaking 概念

`Tree Shaking`描述的是我们在项目中**上下文都未使用**的代码，在打包过程中会将它“优化”掉。  
那么如何判断代码块在**上下文都未使用**呢？  
在纯`ES Module`的代码中，webpack 中已经在内部帮我们做好了判断，很容易就能判断到哪些代码是有`side effect(副作用)`的。

    "side effect(副作用)" 的定义是，在导入时会执行特殊行为的代码，
    而不是仅仅暴露一个 export 或多个 export。
    举例说明，例如 polyfill，它影响全局作用域，并且通常不提供 export。

比如 css 在 JS 文件中引入，因为该文件没有在 js 文件中被使用，webpack 很可能会优化掉它，这是我们可以手动地标记一下，让 webpack 知道这个模块是有副作用的。标记的方法就是在`package.json`中定义`sideEffects`。

```json
// package.json
{
  "name": "test",
  "sideEffects": ["*.css"]
}
```

标记了之后，webpack 会认为这些模块都是有副作用的，在打包的时候会被保留。

可以手动标记文件的副作用，当然也可以标记为**无副作用**

```json
// package.json
{
  "name": "test",
  "sideEffects": false
}
```

除了将文件模块标记副作用，还可以针对某个方法来标记它无副作用。使用`/*#__PURE__*/`标记

```javascript
// 标记无副作用函数
/*#__PURE__*/ test2();
```

### 使用 Tree Shaking

webpack 的`mode:"production"`内置了`Tree Shaking`，设置之后在打包的时候会自动地使用。

## 小结

本小节主要介绍了

- `HMR`： 模块热更新
- `懒加载`： 用于优化初始文件的大小，降低初始文件大小，提高首屏加载速度
- `Tree Shaking`： 打包过程中会将它“优化”掉未被使用的模块
