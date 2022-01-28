## 通用类型

一个简单的函数

```typescript
function func<T>(data: T): T {
  return data;
}

// 调用
const val = func<string>('hello');
// 自动推导调用
const val1 = func('hello');
```

### 在通用约束中使用类型参数

你可以声明类型参数来约束其他类型参数。例如：

```typescript
function getValue<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, 'a');
getProperty(x, 'm'); // error
```

## keyof 类型操作

```typescript
type obj = { test: 'test'; str: 'str' };
type key = keyof obj;

const keys: key = 'a'; // error
const keys: key = 'test'; // correct
```

## typeof 类型操作

typeof 可以返回参数的类型

```typescript
let h = 'hello';
type t = typeof h; // type t = string
```

ReturnType<T> 可以返回函数返回的类型，例如：

```typescript
type func = () => boolean;
type funcType = ReturnType<func>; // type funcType = boolean
```

```typescript
  const f = () => { a: 1, b: 2 }
  type fType = ReturnType<typeof f> // type fType = { a: number, b: number }
```

## 索引允许值

```typescript
type Person = { age: number; name: string; alive: boolean };
type Age = Person['age']; // type Age = number

type T1 = Person['age' | 'name']; // type T1 = number | string
```

## 条件类型

条件类型于`三目运算符`类似，表达式如下:  
`someType extends OtherType ? TrueType : FalseType`  
文字表达如下：如果一个类型继承于某个其他类型，则为 true，否则 false

For Instance:

```typescript
interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}

type Example1 = Dog extends Animal ? number : string; // type Example1 = number
type Example2 = RegExp extends Animal ? number : string; // type Example2 = string
```

有时候我们需要根据输入类型的不同而返回对应的类型，例如以下这个函数：

```typescript
interface IdType = {
  id: number
}

interface NameType = {
  name: string
}

function createLabel(id: number): IdType;
function createLabel(name: string): NameType;
function createLabel(idOrName: number | string): IdType | NameType ;
function createLabel(idOrName: number | string): IdType | NameType {
  // doing something
}
```

上面例子通过重载，根据参数的不同类型，返回不同的数据，可以看出函数非常复杂。这里可以使用条件类型替换他：

```typescript
  interface IdType = {
    id: number
  }

  interface NameType = {
    name: string
  }

  type IdOrName<T extends string | number> = T extends string ? NameType : IdType

  function createLabel<T extends string | number>(key: T): IdOrName<T> {
    // do something
  }
```

### 条件类型约束

```typescript
type MessageOf<T> = T['message']; // error
```

上面例子中，泛型 T 不知道是否有一个叫 message 的属性，所以报错了，我们必须约束泛型 T，让他能支持 message 这个属性：

```typescript
type MessageOf<T extends { message: unknown }> = T['message'];

interface Email {
  message: string;
}

type EmailMessageContents = MessageOf<Email>; // type EmailMessageContents = string
```

如果属性中没有`message`这个属性，则需要返回 never，这时我们可以使用条件类型取约束

```typescript
type MessageOf<T> = T extends { message: unknown } ? T['message'] : never;

interface Email {
  message: string;
}

interface Dog {
  bark(): void;
}

type EmailMessageContents = MessageOf<Email>; // type EmailMessageContents = string

type DogMessageContents = MessageOf<Dog>; // type DogMessageContents = never
```

### 推断中使用条件类型

```typescript
type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;

type T1 = Flatten<string[]>; // type T1 = string

type T2 = Flatten<number>; // type T2 = number
```

```typescript
type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
  ? Return
  : never;
type Num = GetReturnType<() => number>; // type Num = number
type Str = GetReturnType<(x: string) => string>; // type Str = string
type Bools = GetReturnType<(a: boolean, b: boolean) => boolean[]>; // type Bools = boolean[]
```

### 分配式的条件类型

> When conditional types act on a generic type, they become distributive when given a union type

当条件类型用作分配时，他们会使联合类型变得可分配？？？？看不懂，直接上代码

```
type ToArray<Type> = Type extends any ? Type[] : never;

type T1 = ToArray<string | number>; // type T1 = string[] | number[]

type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never; // type StrArrOrNumArr = ToArrayNonDist<string | number>;

```

<!-- ### -->
