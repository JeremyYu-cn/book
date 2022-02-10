### MVVM

`MVVM`是`MVC`演变过来的一种架构，`M`是`Model`层代表数据类型，`V`是`View`层代表视图，`VM`是`View Model`层是`View`和`Model`之间的桥梁。当`View`或`Model`层发生改变是，通知`View Model`层去更新数据。

### Vue 生命周期

Vue 实例的创建过程，在创建实例的过程中 Vue 会提供一些`钩子`函数，以便我们在创建实例的过程中完成某些事情

- Create 阶段

  - BeforeCreate

  - Created

- BeforeMount

- Mounted

- BeforeUpdate

- Update

- BeforeDestory

- Destoryed
