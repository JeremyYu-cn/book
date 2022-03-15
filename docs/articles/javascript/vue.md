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

  - Created：vue 实例已经创建，data 已经有数据，但是未挂载到实例

- Mount 阶段

  - BeforeMount

  - Mounted

- BeforeUpdate

- Update

- BeforeDestory

- Destoryed
