前面我们了解了 webpack 的`output`和`entry`。但是 webpack 自带的能力只能处理`js`和`json`文件，要想处理其他文件，那么就必须要用到`loader`。  
接下来继续了解一下 webpack 如何使用`loader`处理 js，json 以外的文件的。

## Loader

上面我们也提到`loader`是用来处理`js`，`json`之外的文件，将他们转换为有效的模块。那么接下来就看一下 loader 是如何工作的。

### 使用 loader

使用 loader 有两种方式：

1. 配置方式：在 webpack 配置文件中定义 loader，例如在配置文件中配置解析 css 的 loader 如下：
   ```javascript
   // webpack.config.js
   module.exports = {
     mode: 'development',
     entry: getEntry,
     output: {
       filename: '[name].bundle.js',
       chunkLoadingGlobal: 'var test1 = 111',
     },
     module: {
       rules: [
         {
           test: /\.css$/,
           use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
         },
       ],
     },
   };
   ```
   上面代码中，`module`字段作用是决定 webpack 在项目中如何处理不同类型的模块。[\[module 完整配置\]](https://webpack.docschina.org/configuration/module)。  
   **test**用于匹配对应文件，他可以是一个正则表达式，也可以是字符串。  
   **use**表示匹配后的文件使用以下`loader`，注意一点：loader 的执行顺序是`从下往上`执行。
2. 内联方式：在每个文件中 import
   ```javascript
   import Styles from 'style-loader!css-loader?modules!./styles.css';
   ```

### 编写一个 loader

介绍了 loader 如何使用，那么接下来介绍一下如何编写一个 loader。

- 例如：编写一个 loader，匹配所有的 js 文件并且注入代码到文件中。

```javascript
// entry.js
function test1() {
  console.log('test1');
  console.log(inject);
}
test1();

// entry1.js
function test2() {
  console.log('test2');
  console.log(inject);
}
test2();

// loader/inject.js
module.exports = function (source) {
  console.log(source);
  return `
    var inject = 'inject code';
    ${source}
  `;
};

// webpack.config.js
const path = require('path');
module.exports = {
  mode: 'production',
  entry: {
    app: path.resolve(__dirname, 'src', 'entry.js'),
    lib: path.resolve(__dirname, 'src', 'entry1.js'),
  },
  output: {
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{ loader: path.resolve(__dirname, 'loader', 'inject') }],
      },
    ],
  },
};
```

执行 webpack 后输出

```javascript
// app.bundle.js
console.log('test1'), console.log('inject code');

// lib.bundle.js
console.log('test2'), console.log('inject code');
```

- 上面代码可以看到， 我们在 loader 中注入了一个值为`inject code`的变量，打包后变量都注入到了所有**test**匹配到的文件中。
- loader 函数需要接收一个参数，该参数为匹配到的文件以`字符串`形式输出，在拿到文件数据后，我们就可以针对数据进行修改或者扩展，最后将处理后的数据 return 出去。
- 如果存在多个 loader，loader 会**从下往上执行**，上层的 loader 接收到的数据是下层 loader 处理后的数据。

### loader 特性

接下来了解一下 loader 的特性，根据特性我们可以写一些更加复杂的 loader。

- 链式调用，其实就是上文提到的 loader 从下往上执行
- loader 的方法可以是同步，也可以是异步的
- loader 运行在 node.js 中，可以执行**任何操作**，包括且不限于一些文件 I/O 操作，对操作系统进行操作，进程创建操作。

## 小结

本节主要讲了 webpack 基本配置中的`loader`

- `loader`是用于处理 webpack 自身不能处理的文件的，理论上通过编写 loader 可以处理所有文件。
- `loader`是一个函数，入参是一个匹配到的文件的字符串，输出的是处理后的数据(字符串)。
- `loader`具有链式调用；同步/异步调用；在 node 中执行，可以进行任何操作的特性。
