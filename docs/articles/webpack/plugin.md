前面我们已经学习了`mode`，`entry`，`output`，`loader`这些基本配置，接下来继续学习 webpack**最重要**的一个基本配置：`Plugin`

## Plugin（插件）

前文也提到，webpack 有打包过程分为许多个步骤，每一个步骤都会有相对应的[钩子](https://webpack.docschina.org/api/compiler-hooks/)。  
`plugin`的作用就是在钩子中添加对应的打包逻辑，当钩子触发会调用预先声明的函数。

### Plugin 与 Loader 的区别

与上一节我们学到的`Loader`不同，`Plugin`的用处比`Loader`更广泛。  
`Loader`是让 webpack 支持除了 js 和 json 文件之外的文件处理。  
`Plugin`则是针对整个 webpack 打包的步骤去对对打包项目进行**扩展和管理**，包括但不限于**打包优化**，**资源管理**，**注入环境变量**。

### Plugin 的用法

聊完 Plugin 的基本概念，接下来看一下如何使用`Plugin`，前面我们已经学会将模块打包成一个整体的文件，现在我们想要把 js 文件在`打包完成之后自动地引入到html文件中`。  
首先我们新建一个 html 模板：

```html
<!DOCTYPE html>
<html lang="text/html">
  <head>
    <title>test</title>
    <meta charset="utf-8" />
  </head>
  <body>
    <p>Hello World</p>
  </body>
</html>
```

在写两个简单的 js 文件

```javascript
// entry.js
function test1() {
  console.log("test1");
}
test1();

// test.js
function test2() {
  console.log("test2");
}
test2();
```

编写 webpack 配置，将他们打包合并在一起，并且引用`html-webpack-plugin`插件，将生成后的 js 文件写入 html 模板并输出。

```javascript
const path = require("path");
const htmlPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: [
    path.resolve(__dirname, "src", "entry.js"),
    path.resolve(__dirname, "src", "test2.js"),
  ],
  output: {
    filename: "bundle.js",
  },
  plugins: [
    new htmlPlugin({
      template: path.resolve(__dirname, "src", "test.html"),
    }),
  ],
};
```

打包后会出现两个文件，一个是 js 文件，另一个是基于模板 html 生成的 html 文件。并且 html 文件会带上打包后的 js 文件引用。

```html
<!DOCTYPE html>
<html lang="text/html">
  <head>
    <title>test</title>
    <meta charset="utf-8" />
    <script defer="defer" src="bundle.js"></script>
  </head>
  <body>
    <p>Hello World</p>
  </body>
</html>
```

### 编写一个 Plugin

学会使用`plugin`后，接下来深入地研究一下：**plugin 究竟是如何编写的。**  
plugin 实际上是一个对象，对象中必须有一个`apply`方法。

```javascript
function MyPlugin() {
  return {
    apply(complier) {
      complier.hooks.run.tap("MyPlugin", (compilation) => {
        console.log("webpack is running！");
      });
    },
  };
}
```

上面的代码就是一个最简单的 webpack 插件。

- 从代码中可以看到 apply 方法调用时，webpack 会传入一个`complier`对象到方法中，`complier`是 webpack 的**主要引擎**，他包含了生命周期钩子，webpack 的配置等信息。
- 然后我们声明了一个在`run`生命周期的时候调用的方法。  
   当调用时，webpack 会传入一个`compilation`实例，它能够访问所有的模块和它们的依赖。  
  具体的`compiler`和`compilation`钩子参数，点击[这里](https://webpack.docschina.org/api/compiler-hooks)了解更多

了解了 plugin 是如何实现的，接下来我们就来写一个简单版的`html-webpack-plugin`  
具体实现的功能：当打包完成后，生成一个 script 标签放入 html 文件中。  
代码如下：

```javascript
// plugin.js
const fs = require("fs");
const path = require("path");

function MyPlugin(templateName = "") {
  return {
    apply(complier) {
      complier.hooks.run.tap("MyPlugin", (compilation) => {
        const { outputPath } = compilation;
        const fileName = compilation.options.output.filename;
        const script = `<script lang="text/javascript" defer src="${fileName}"></script>`;
        let fileChunk = fs.readFileSync(templateName, "utf-8");
        fileChunk = fileChunk.replace("</head>", `${script}\n</head>`);
        fs.writeFileSync(path.resolve(outputPath, "index.html"), fileChunk);
      });
    },
  };
}
module.exports = MyPlugin;

// webpack.config.js
const path = require("path");
const htmlPlugin = require("html-webpack-plugin");
const MyPlugin = require("./src/plugin");

module.exports = {
  mode: "production",
  entry: [
    path.resolve(__dirname, "src", "entry.js"),
    path.resolve(__dirname, "src", "test2.js"),
  ],
  output: {
    filename: "bundle.js",
  },
  plugins: [new MyPlugin(path.resolve(__dirname, "src", "test.html"))],
};
```

## 小结

本小节讲述了`plugin`的作用；`plugin`与`loader`的区别；用法和如何编写一个 plugin。

- `plugin`的作用就是在钩子中添加对应的打包逻辑，在打包过程中进行一些额外的操作。
- `loader`是让 webpack 支持其他文件的处理；`plugin`是针对整个 webpack 打包的步骤去对对打包项目进行扩展。
- 实现一个 plugin，只需要返回一个**对象**，对象中包含一个`apply`方法即可
