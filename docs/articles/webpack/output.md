[上一节](articles/webpack/entry.md)讲了 webpack 基本配置中的`entry`，接下来继续聊一下 webpack 的其他基本配置

## 打包模式 mode

打包模式用于让 webpack 知道你是用哪一种打包方式，mode 一共有三种方式，分别是：`development`，`production`，`none`，不同的打包方式的作用都不一样。

- `development`  
   mode 值为`development`，执行打包命令时会将 node 环境变量**process.env.NODE_ENV**设置成`development`，同时会为模块和 chunk 启用有效的名。

```javascript
// webpack.config.js
module.exports = {
  mode: "development",
};
```

- `production`  
   mode 定义为`production`，会将 node 环境变量设置为`production`，并开启代码压缩和优化。默认使用 webpack 内置的优化插件**FlagDependencyUsagePlugin**，**FlagIncludedChunksPlugin**，**ModuleConcatenationPlugin**，**NoEmitOnErrorsPlugin**  和  **TerserPlugin**

```javascript
// webpack.config.js
module.exports = {
  mode: "production",
};
```

- `none`  
  不使用任何打包优化

```javascript
// webpack.config.js
module.exports = {
  mode: "none",
};
```

- 当我们不配置 mode 的时候，mode 会默认设置为`production`

## 打包输出 output

output 定义的是打包后的文件应该怎么输出文件。output 需要传入一个对象，比如我们上一节的例子：

```javascript
export default {
  entry: ["./src/index1.js", "./src/index2.js"],
  output: { filename: "bundle.js" },
};
```

上面只是一个最简单的打包输出配置，`filename`代表的是输出文件的名称。output 还有其他参数来让我们配置打包输出，下面就来一一简单地介绍一些常用的 output 的参数：

- `filename`: 输出的文件名，输出的文件名可以是静态的，也可以使用 webpack 内置的模板，内置的模板有：**\[id\]**，**\[name\]**，**\[contenthash\]** 等等。例如输出的文件名我们可以使用通过文件的 hash 值生成文件名可以这样写:

  ```javascript
  filename: "[contenthash].bundle.js";
  ```

  当我们有多个入口文件时，利用模板字符串可以将他们打包成独立的文件。

- `publicPath`: 指定打包的文件的公共路径，例如**CDN**和其他存放静态资源的服务器。
  例如我们在 css 或者 js 文件有相对路径，打包后相对路径就会被 publicPath 所替代

  ```javascript
  // test.css
  .cls {
      background-image: url(./img/test.png)
  }

  // webpack.config.js
  module.exports = {
      output: {
          fileName: [name].js,
          publicPath: "https://www.testcdn.com/",
      }
  }
  ```

  设置`publicPath`后打包输出

  ```css
  .cls {
    background-image: url(https://www.testcdn.com/img/test.png);
  }
  ```

- `path`: 指定打包输出的目录，可以与`publicPath`配合使用
  ```javascript
  // webpack.config.js
  const path = require('path')
  module.exports = {
      output: {
          path: path.resolve(__dirname, 'dist')
          fileName: [name].js,
          publicPath: "https://www.testcdn.com/dist",
      }
  }
  ```

output 除了上面三个比较常用的属性还有其他一些更复杂的配置，详情参考[这里](https://webpack.docschina.org/configuration/output/)

## webpack 模板字符串

在 output 的 filename 属性中，我们使用了内置的模板字符串，其实他是由`TemplatedPathPlugin`插件提供服务的。模板字符串的使用分为四个部分:**编译层面**,**chunk 层面**，**模块层面**和**文件层面**。

- 编译层面模板  
   | 模板名 | 作用 |
  | ----- | ------ |
  | [fullhash] | 编译时的完整 hash |
- chunk 层面模板  
   | 模板名 | 作用 |
  | ----- | ------ |
  | [id] | chunk 的 id |
  | [name] | chunk 的名称 |
  | [chunkhash] | 模块的 hash 值 |
  | [contenthash] | 根据 chunk 内容生成的 hash 值 |

- 模块层面模板  
   | 模板名 | 作用 |
  | ----- | ------ |
  | [id] | 模块的 id |
  | [hash] | 模块的 hash 值 |
  | [contenthash] | 根据模块内容生成的 hash 值 |
- 文件层面模板  
   | 模板名 | 作用 |
  | ----- | ------ |
  | [file] | 文件名和路径 |
  | [query] | 前缀带?的参数 |
  | [fragment] | 前缀带#的参数 |
  | [base] | 当前文件名，包含扩展名 |
  | [path] | 当前文件路径 |
  | [name] | 当前文件名，不含扩展名 |
  | [ext] | 当前文件后缀 |

## 小结

本小节介绍了 webpack 基本配置中的`mode`和`output`属性，还介绍了 webpack 中的模板字符串

- mode 为指定打包的模式，分配`development`，`production`和`none`三种
- output 则是指定打包后输出的目录，介绍了 output 常用的属性
- webpack 四类模板字符串的每个模板的作用

文章是`从零开始学习webpack系列`的第二篇，其他章节可以看下面 👇：

[从零开始学习 webpack5.x(一)](articles/webpack/entry.md)
