

`Vite`作为一个新的开发与构建工具，有着比使用`webpack`，`rollup`等打包工具快得多的`热更新(HMR)`与服务器冷启动，得益于使用`esbuild`的方式**预构建**与直接在浏览器中使用`ESModule`的方式引入文件。   
所以`vite`能帮助我们很大程度的提升开发效率与体验，下面以从零配置一个Vue3.x项目为例，一起来学习一下这个构建工具吧～ 

## 基本概念

在开始之前，我们需要先了解一下vite中的一些基本概念。

### 依赖预构建

vite在启动服务的时候会先搜索项目中需要用到的`原生模块`，由于原生模块无法被浏览器的ESM所识别，所以vite利用`esbuild`将原生模块打包成`ESM`。

### 天然支持TypeScript

vite天然支持TypeScript，使得在配置构建文件的时候我们不需要对ts文件进行额外的支持。

### 插件

与其他构建工具一样，插件用于对构建工具的`扩展`，我们可以利用插件来对文件进行特定的处理。

## 从零搭建vue项目

了解了基本的概念，下面就开始来搭建项目。

### 1.新建项目，安装必要的模块

* 在项目内安装`vite`和支持vue的插件`@vitejs/plugin-vue`   
    > yarn add vite @vitejs/plugin-vue -D   
    
* 安装vue3   
    > yarn add vue@next
    
安装完后对文件进行创建


* 创建一个`index.html`作为入口的html文件

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6d3fa431f29e4fadb7f7fb520fe994c1~tplv-k3u1fbpfcp-watermark.image?)

注意：`<script type="module" src="/src/main.ts"></script>` 中的`type="module"`

global.d.ts 用于声明全局模块的类型，因为这里只创建基本的vue项目，这里只需要对vue文件进行兼容
```typescript
    // global.d.ts
    declare module '*.vue' {}
```

### 2.创建vite配置文件，用于控制构建工具进行特定的操作。

```typescript
import { defineConfig } from 'vite';
import vuejs from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vuejs()],
});
```

在构建工具中使用`@vitejs/plugin-vue`插件，以支持vue文件。

### 3.编写vue页面

我们在src中新建两个文件`main.ts`和`main.vue`

* `main.ts`就是常规的vue入口页面
```typescript
// main.ts
import { createApp } from 'vue';
import App from './main.vue';

const app = createApp(App);

app.mount('#app');
```

* `main.vue`为入口的页面

```html
// main.vue
<script lang="ts" setup>

</script>

<template>
  <div>
    Hello World
  </div>
</template>

<style>

</style>
```

来测试一下

在`package.json`的script中添加
```json
"scripts": {
    "dev": "vite --port 8080"
}
```

运行一下 `yarn dev`


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/37dea898ac3d417783311dd7b9399c26~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ad790062e5e34acd907476fab01b2ec0~tplv-k3u1fbpfcp-watermark.image?)

到这里，我们已经完成了一个简单的vite配置，接下来继续深入一下配置。

### 配置全局变量

### 参考

1. [vite](https://vitejs.cn/)





