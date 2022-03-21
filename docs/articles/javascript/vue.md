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
