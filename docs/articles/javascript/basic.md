## 前端基础

### JS 数据类型

#### 基本类型

- string
- number
- boolean
- null
- undefined
- symbol
- bigint

#### 引用类型

- object
- array 数组实际上也是对象，存放数据的方式不一样
- function (对象)

### 闭包

定义：在函数内声明一个内层函数，内层函数又改变外层函数变量的值

作用：

- 能够访问函数定义时所在的词法作用域
- 私有化变量
- 模拟块级作用域
- 创建模块

缺点： 会使变量持续存在一个内存中，不被回收

### 原型和原形链

原型：每个对象都会有一个原型(propotype)，每一个对象的**proto**都会指向对象的 prototyoe
原型链：当我们在一个对象中寻找某个属性的时候，如果对象内部不存在这个对象，则会向对象的 prototype 查找，一直到 prototype 为空为止

判断一个对象是否在某个原型链上

```javascript
function Obj() {}

var obj1 = new Obj();

console.log(Obj.prototype.isPrototypeOf(obj1));
```

### this 关键字，new 关键字

this: 执行上下文的一个属性，它指向最后一次调用该方法的对象。判断 this 指向：

1. 函数调用，当一个函数不是一个对象的属性时，直接作为函数来调用，this 指向全局对象
2. 方法调用，当一个函数作为对象的方法调用时，this 指向该对象
3. 构造函数(new)的 this 会指向该对象
4. call, apply, bind 能改变 this 指向

new 关键字时一个语法糖，具体实现

```javascript
function MyNew(func, args = []) {
  // 1. 声明一个对象
  // 2. 该对象的原型指向 func的原型
  // 3. 调用该函数，如果调用后返回一个对象，则return它，如果没有，则rteurn声明的对象
  let obj = {};
  obj.__proto__ = func.prototype;
  let ret = func.call(obj, ...args);

  if (ret !== null && (typeof ret === 'object' || typeof ret === 'function')) {
    return ret;
  }

  return obj;
}
```

### 作用域，作用域链表，变量提升

作用域： 负责收集和维护由所有声明的标识符组成的一系列查询，并实施一套严格的规则，确定当前执行的代码对这些标识符的访问权限。

作用域分为： 块级作用域，函数作用域，全局作用域。

作用域链：从当前作用域开始一层一层向上寻找某个变量，直到全局作用域都没有找到时，就放弃查找。

### [继承](https://juejin.cn/post/6844903696111763470)

- 原型链继承：实现简单，缺点：多个实例对引用类型的操作会被篡改。

```javascript
function SuperType() {
  this.super = true;
}

SuperType.prototype.getSuper = function () {
  return this.super;
};

function SubType() {
  this.sub = false;
}

// subType的原型指向父类的实例
SubType.prototype = new SuperType();

SubType.prototype.getSub = function () {
  return this.sub;
};

console.log(new SubType());
```

- 借用构造函数继承：  
  缺点：
  - 只能继承父类的实例属性和方法，不能继承原型属性和方法
  - 无法实现复用，每个子类都有父类实例函数的副本，影响性能

```javascript
function SuperType() {
  this.test = false;
}

function SubType() {
  SuperType.call(this);
}

console.log(new SubType());
```

- 组合继承： 用原型链实现对原型属性和方法的继承，用借用构造函数技术来实现实例属性的继承。  
  缺点：
  - 子类创建实例时，原型中会存在两份相同的属性/方法

```javascript
function SuperType() {
  this.test = false;
}
SuperType.prototype.getTest = function () {
  return this.test;
};

function SubType() {
  // 第二次调用
  SuperType.call(this);
  this.sub = 123;
}

// 第一次调用
SubType.prototype = new SuperType();
// 修改SubType的构造器，使其指向SubType
SubType.prototype.constructor = SubType;
SubType.prototype.getSub = function () {
  return this.sub;
};
console.log(new SubType());
```

- 原型式继承：利用一个空对象作为中介，将某个对象直接赋值给空对象构造函数的原型。(Object.create)  
  缺点：
  - 原型链继承多个实例的引用属性指向相同，存在篡改可能
  - 无法传递参数

```javascript
function Extend(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}
```

- 寄生继承： 在原型式继承的基础上，增强对象，返回构造函数  
  缺点：
  - 原型链继承多个实例的引用属性指向相同，存在篡改可能
  - 无法传递参数

```javascript
function obj(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}

function Extend(origin) {
  // 函数的主要作用是为构造函数新增属性和方法，以增强函数
  let clone = obj(origin);
  clone.getTest = function () {
    return test;
  };
  return clone;
}
```

- 寄生组合继承： 结合借用构造函数传递参数和寄生模式实现继承

```javascript
function extend(subType, superType) {
  // 原型式继承
  let prototype = Object.create(superType.prototype);
  prototype.constructor = subType; // 增强对象，弥补因重写原型而失去的默认的constructor 属性
  subType.prototype = prototype; // 指定对象，将新创建的对象赋值给子类的原型
}

// 父类初始化实例属性和原型属性
function SuperType(name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}
SuperType.prototype.sayName = function () {
  alert(this.name);
};

// 借用构造函数传递增强子类实例属性（支持传参和避免篡改）
function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}

extend(SubType, SuperType);

const test = new SubType();
console.log(test);
```

### EventLoop

> JS 是单线程的，为了防止一个函数执行时间过长阻塞后面的代码，所以会先将同步代码压入执行栈中，依次执行，将异步代码推入异步队列，异步队列又分为宏任务队列和微任务队列。

- 宏任务 （setInterval，setTimeout，setImmediate）

- 微任务 （Promise.then，async/await，MutationObserver）

### 原生 ajax

```javascript
// 法1
var request = new XMLHttpRequest();
request.open();
request.send();
request.onreadystatechange = function () {
  // ...
};
// 法2
fetch();
```

### 事件委托(捕获)，冒泡

- `事件冒泡`指在在一个对象上触发某类事件，如果此对象绑定了事件，就会触发事件，如果没有，就会向这个对象的父级对象传播，最终父级对象触发了事件。

- `事件委托`本质上是利用了浏览器事件冒泡的机制。因为事件在冒泡过程中会上传到父节点，并且父节点可以通过事件对象获取到目标节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件，这种方式称为**事件代理**。
