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
