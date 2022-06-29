## 什么是WebAssembly

在学习`WebAssembly`之前，首先需要知道它是什么，官方是这样描述WebAssembly的：
> WebAssembly (abbreviated *Wasm*) is a binary instruction format for a stack-based virtual machine. Wasm is designed as a portable compilation target for programming languages, enabling deployment on the web for client and server applications.

翻译一下大致就是说：WebAssembly是一种`基于堆栈`的`二进制`指令格式。他被设计成一个程序语言`可移植`的目标，允许在Web客户端和Server应用中使用。

简单来说，WebAssembly就是一种二进制堆栈的指令，这种指令可以在Web或者Server端中引入并使用。   

WebAssembly可以将C/C++或其他编程语言编写的程序编译成二进制的指令。可以引入并到Web中使用。

![image.png](https://img.yzmblog.top/blog/wsam_01.png)

需要明确的一点是，WebAssembly**不是**编程语言，他只是将一种语言转换成浏览器可解析的二进制码。

## 为什么需要使用WebAssembly

既然JS已经可以处理Web了，为什么还要搞一个wsam给前端调用或者运行呢？

我们都知道JS是一种`解析型`的语言，用**边读边执行**的方法去执行代码的。相比于编译型的语言，最大的缺点就是**执行慢**。  

而通过WebAssembly编译的二进制指令，省略了js的编译过程，有着接近原生应用的执行速度。所以利用来开发**高性能**的Web应用，例如：视频处理，3D渲染，AR/VR等等...

## WebAssembly工作原理

WebAssymbly的工作原理可以概括成几个步骤：   

1. 使用C/C++等语言编写程序
2. 通过WebAssembly编译成**浏览器能识别的汇编语言**
3. 在JS或者html中使用编译后的文件并暴露方法。

## 尝试使用WebAssembly

了解完WebAssynbly是的基本概念，接下来就实践一下：编写一个简单的WebAssembly模块并放到JS中使用。

WebAssembly所需的API可以到[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Instance)中查看.

这里我们主要用到的API有：

* Memory： 声明一个内存空间
* compile： 编译wsam文件
* instantiate：将编译后的模块导入到js中

首先编写一个C程序
```c
char *helloworld()
{
  return (char*)"hello world";
}
```
然后通过WebAssembly编译成`.wsam`文件，我们可以在[这里](https://mbebenita.github.io/WasmExplorer/)在线尝试编译


![image.png](https://img.yzmblog.top/blog/wsam_02.png)

编译完成后新建一个js文件，用来引入wsam文件

```javascript

(async () => {
  const mem = new WebAssembly.Memory({
    initial: 100,
  });
  const target = await getModules('./test.wasm', {
    // 引入wsam所需要的模块
    env: {
      memory: mem,
    },
  });
  const HEAP8 = new Int8Array(target.exports.memory.buffer);
  const test = AsciiToString(target.exports.helloworld(10), HEAP8);
  console.log(test);
})();

// Ascii转为String
function AsciiToString(ptr, heapu8) {
  let str = '';

  while (1) {
    let ch = heapu8[ptr++];
    if (!ch) return str;
    str += String.fromCharCode(ch);
  }
}

// 获取wsam模块
async function getModules(url, imports = {}) {
  const data = await fetch(url);

  const module = await WebAssembly.compile(await data.arrayBuffer());

  return WebAssembly.instantiate(module, imports);
}

```

新建一个html文件引入js，运行页面，可以看到我们才C语言中定义的方法已经可以被JS所运行了～

![image.png](https://img.yzmblog.top/blog/wsam_03.png)

## 总结

本文介绍了   
* WebAssembly的概念与基本概念，为什么使用它以及WebAssembly的工作原理。
* 通过一个例子来了解WebAssembly是如何使用的

### 参考

1. [十分钟搞懂WebAssembly](https://www.jianshu.com/p/e4d002780cf8)
2. [WebAssembly](https://webassembly.org/getting-started/developers-guide/)
3. [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Instance)






