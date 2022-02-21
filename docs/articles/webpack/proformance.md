学习完前面的知识，我们已经可以解决 webpack 的常见问题，接下来深入了解一下 webpack 的**打包优化策略**。

## 优化构建速度

1. 缩小模块查找范围  
   使用`loader`的实质是在操作字符串，这种字符串操作可能是非常消耗性能的，很多时候无法优化 loader，但是我们可以尽可能少地让处理文件。

   - 具体的做法有通过`include`指定 loader 检索的目录：

   ```javascript
   // webpack.config.js
   const path = require('path');
   module.exports = {
     module: {
       rules: [
         {
           test: /\.css$/,
           use: ['style-loader'],
           include: [path.resolve(__dirname, 'src')],
         },
       ],
     },
   };
   ```

2. 使用动态链接库  
   动态链接库可以包含给其他模块调用的函数和数据，我们可以利用动态链接库优化构建速度。  
   为什么利用 dll 可以提升构建速度？  
   因为在 webpack 构建过程中，有很多不需要改变的第三方库，每次构建都会重新把它们编译一遍，如果`使用dll则只需要编译一次`，之后都构建都会从 dll 中取出代码使用，不会重新编译。  
   webpack 内置了动态链接库插件[DllPlugin](https://webpack.js.org/plugins/dll-plugin/)，使用它也很简单，只需要在 plugin 配置就可以了：

   ```javascript
   // webpack.config.js
   const path = requrie('path');
   const DllPlugin = require('webpack/lib/DllPlugin');
   module.exports = {
     plugins: [
       new DllPlugin({
         name: '_dll_[name]',
         path: path.resolve(__dirname, '[name].manifest.json'),
       }),
     ],
   };
   ```

3. 使用多进程进行打包

   webpack 是**基于 node**的，他的单线程模型**不太适合处理 I/O 密集型**的操作。在当需要处理的文件非常多是，单线程也只能一个一个排队处理。  
   解决这个问题是利用计算机的多核特性，使用`worker`或者多进程的方式，同时处理多个文件，最后将处理结果发送回主进程。可使用的插件有:[HappyPack](https://github.com/amireh/happypack)

   ```javascript
   // webpack.config.js
   const path = require('path');
   const HappyPack = require('happypack');
   module.exports = {
     module: {
       rules: [
         {
           test: /\.js&/,
           use: ['happypack/loader?id=babel'],
           include: [path.resolve(__dirname, 'src')],
         },
       ],
     },
     plugins: [
       new HappyPack({
         id: 'babel',
         loaders: ['babel-loader'],
       }),
     ],
   };
   ```

4. 使用多进程进行代码压缩  
   除了使用多进程进行构建，同理还可以使用多进程进行代码压缩处理。  
   可以使用的插件有：[ParallelUglifyPlugin](https://github.com/gdborton/webpack-parallel-uglify-plugin)

## 优化打包质量

上面我们讲了如何在项目测试过程中如何提升构建速度，提高开发效率。  
但是在构建生产代码时显然代码质量会比较重要，接下来继续看一下优化打包质量的方法

1. 提取公共代码

   - 在代码开发过程中可能会用到相同的库，比如在用 React 或者 Vue 开发 SPA 应用时，每一个页面都是同样的技术栈和代码，导致这些页面之间有很多重复的代码。
   - 提取公共代码的目的就是结局页面之间重复使用代码的问题。
   - 将每个页面间重复打包的代码抽离出来，这样重复的代码在用户浏览的时候**只需加载一次**，然后浏览器将他们缓存起来，访问第二个页面时则直接使用缓存。
   - 为此，webpack 内置了一个`CommonsChunkPlugin`的插件，可以在打包过程中提取公共代码

   ```javascript
   // webpack.config.js
   const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
   module.exports = {
     plugins: [
       new CommonsChunkPlugin({
         // 需要提取的chunk
         chunks: [],
         name: 'common',
       }),
     ],
   };
   ```

2. Tree Shaking & 懒加载  
   [上一节](https://juejin.cn/post/7066738330582384648)中提到的`Tree Shaking`和`懒加载`也是提高代码质量发一种方法。  
   `Tree Shaking`能将在上下文中未使用的代码“优化”掉  
   `懒加载`则是从逻辑上将代码包分割开来，优化首屏加载速度

3. 其他优化  
   除了`提取公共代码`,`Tree Shaking`和`懒加载`，优化打包质量的方法还有很多，例如:
   - 代码压缩： webpack `mode: "production"`已经内置引用了代码压缩的插件
   - 使用 CDN： 在 output/entry 中填写`publicPath`，然后将打包后的文件放到 cdn 中

## 总结

本节主要介绍了 webpack 打包优化的策略。

- 优化构建速度
  - 缩小模块查找范围
  - 使用动态链接库(dll)
  - 使用多进程进行打包
  - 使用多进程进行代码压缩
- 优化打包质量
  - 提取公共代码
  - Tree Shaking & 懒加载
  - 代码压缩，使用 CDN 等

虽然优化策略有很多种，但是这些方法没有办法覆盖所有的业务场景，比如在打包项目到**生产环境**的时候，**打包质量**要比构建速度更重要，所以我们需要针对不同的场景来制定优化策略~
