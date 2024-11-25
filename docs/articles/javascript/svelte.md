## Introduction of Svelte

`Svelte` 是一个在 web 中构建用户界面的框架。它使用编译器并使用 HTML，CSS 和 Javascript 来编写声明式组件.

> Svelte is a framework for building user interfaces on the web. It uses a compiler to turn declarative components written in HTML, CSS and JavaScript...

`.svelte`后缀的文件是用于构建 Svelte 应用的组件。与`.vue`文件类似，`.svelte`文件包括三部分：`HTML`, `style`, `script`, 其中 `style` 和 `script` 是可选的。

```javascript
// .svelte file

<script module lang="ts">
    // Script module
</script>

<script lang="ts">
    // Script logic
</script>

<style>
    // Style
</style>

```

## Rune(s)

`Runes` 是一个用于在**.svelte**文件中控制 Svelte 编译器的一种特殊符号。

```javascript
let message = $state("hello");
```

### $state

与 React 的 state 相似，`$state` 允许我们创建一个响应状态，让 UI 可以动态地响应数据变化。

```svelte

<script lang="ts">

let count = $state(1)
const onClick = () => count++

</script>

<button onClick={onClick}>
{ count }
</button>

```

如果声明的`stste`是一个数组或对象，state 则会返回一个`proxy`对象

```svelte

<script lang="ts">
    const obj = $state<{ test: number }>({ test: 1 })

    console.log(obj) // Proxy
</script>

<p>{ obj.test }</p> // 1

```

![alt text](./images/svelte_state_1.png)

我们也可以使用`class`关键字来使用`$state`

```svelte
<script lang="ts">
  class TestClass {
    num: number = $state(0);
    text: string = $state("");
    constructor(text: string) {
      this.text = text;
    }

    public addCount() {
      this.num++;
    }
  }

  const test = new TestClass("Hello World");
</script>

<button onclick={() => test.addCount()}>Add Count</button>
<p>{test.text} {test.num}</p>
```

- $state.raw

如果我们不想在 Array 或 Object 中`深度监听`数据变化，我们可以用`$state.raw`方法声明变量。

```svelte

<script lang="ts">

let test = $state.raw({
    text: "Hello world"
})

test.text = "New Text"

setTimeout(() => {
    test = {
        text: "Text Changed"
    }
}, 2000)

</script>

<p>{test.text}</p>

```

这种方法可以`提高`在大型数组和对象中的`性能`，避免在这样的数据中进行过度的监听。

- $state.snapshot

在`$state`进行深度监听数据时，返回的是一个`Proxy`对象，如果我们想获取在某一个时间片段中获取该`Proxy`对象的静态数据，需要用到`$state.snapshot`方法。

```svelte
<script lang="ts">
    const test = $state({ a: 1, b: 2 })
    console.log(test); // Proxy
    console.log($state.snapshot(test)); // { a: 1, b: 2 }
</script>
```

### $derived
