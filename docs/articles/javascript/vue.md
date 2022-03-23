## Vue 基础知识总结

## MVVM

`MVVM`是`MVC`演变过来的一种架构，`M`是`Model`层代表数据类型，`V`是`View`层代表视图，`VM`是`View Model`层是`View`和`Model`之间的桥梁。当`View`或`Model`层发生改变是，通知`View Model`层去更新数据。

## Vue 生命周期

Vue 实例的创建过程，在创建实例的过程中 Vue 会提供一些`钩子`函数，以便我们在创建实例的过程中完成某些事情

- Create 阶段

  - BeforeCreate： vue 实例创建之前调用的钩子，此时 date 和 method 中的数据都还没初始化

    - 初始化完生命周期
    - 初始化所有事件
    - 初始化渲染函数

  - Created：vue 实例已经创建，data，method，computed，watch 已经配置完成，但未挂载到实例

- Mount 阶段

  - BeforeMount：挂在开始之前被调用，此时 render 函数首次被调用。此阶段执行的操作，编译模板，将 data 中的数据替换到 html 模板中。但此时还没有将 html 挂载到页面上。

  - Mounted：此阶段执行的操作：将编译好的 html 放到 el 属性对应的 DOM 节点中。

- BeforeUpdate：响应式数据更新时调用，虽然数据更新了，但是此时还没有替换页面中的 html

- Update：响应式数据更新后，html 页替换了页面后调用

- BeforeDestory：组件销毁前调用

- Destoryed：组件销毁后调用

- activated: keep-alive 所有的生命周期，激活缓存组件时调用

- deactivated: keep-alive 所有的生命周期，缓存组件时调用

## Vue 父子组件生命周期执行顺序

### 渲染过程

- 父 beforeCreated
- 父 created
- 父 beforeMount
- 子 beforeCreated
- 子 created
- 子 beforeMount
- 子 mounted
- 父 mounted

### 更新过程

- 父 beforeUpdate
- 子 beforeUpdate
- 子 updated
- 父 updated

### 销毁过程

- 父 beforeDestory
- 子 beforeDestory
- 子 destoryed
- 父 destoryed

## 组件通信

### props/emit

- props

```typescript
// 子组件 ChildComp
{
  props: {
    test: {
      type: Object,
      value: {}
    }
  }
}

// 父组件
<ChildComp :test="obj">
```

### 子组件向父组件传值

- emit

```typescript
// 父组件
<ChildComp @data="(data) => { console.log(data) }">

// 子组件
{
  data: {
    test: "test"
  },
  mounted() {
    this.$emit("test", { test: this.test })
  },
}
```

### 事件总线 EventBus

通过一个 vue 实例的 $emit/$on 在父/子，非父子之间传递数据

```typescript
// eventbus.js

import Vue from "vue";

export const EventBus = new Vue();
```

两个兄弟节点 childA 和 childB 模拟 A 向 B 发送数据

```typescript
// childA
import { EventBus } from 'eventbus.js'
{
  mounted() {
    EventBus.$emit("postData", { data: "test" })
  }
}
```

```typescript
// childB
import { EventBus } from 'eventbus.js'
{
  mounted() {
    EventBus.$on("postData", (data) => {
      console.log(data.data) // test
    })
  }
}
```

当维护一个庞大的项目时，这种方法就会维护起来非常复杂

### Provide/inject

通过依赖注入的方法向子组件传递数据

```typescript
// 父组件
provice() {
  return {
    data: "test"
  }
}

// 子组件
inject: ["data"]
```

### ref/$refs

- ref: 在子组件中使用，用于表示此子组件实例

- $refs: 获取所有标记了的子组件实例

```typescript
// 父组件

<template>
  <ChildComp ref="child">
</template>

<script>
  export default {
    mounted() {
      // 获取子组件实例
      this.$refs.child
    }
  }
</script>
```

### $parent/$children

- $parent： 用于获取子组件的父组件实例

- $children： 获取父组件中的所有子组件实例

### $attrs/$listen

用于深层次组件嵌套获取父组件属性和事件

```typescript
// 父组件
<template>
  <ChildA dataA="testA" dataB="testB" @clickA="clickA" @clickB="clickB" />
</template>

<script>
export default {
  methods: {
    clickA() {
      console.log("trigger A")
    },
    clickB() {
      console.log("trigger B")
    },
  }
}

// 子组件A
<template>
  <ChildB v-bind="$attrs" v-on="$listeners" />
<template>

<script>
export default {
  props: ["dataA"],
  inheritAttrs: false,
  mounted() {
    this.$emit("clickA")
  }
}

// 子组件B
<template>
  <p>{dataB}</p>
</template>

<script>
export default {
  props: ["dataB"]
  inheritAttrs: false,
  mounted() {
    this.$emit("clickB")
  }
}
</script>

</script>

</script>

```
