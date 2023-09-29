This page is an introduction to the C++ language. Reading this page, you can learn some basic knowledge of C++, which can be used in this programming language to solve some basic problems.

## A simple C++ programme

```c++
#include <iostream>

using namespace std;

int main() {
  cout << "Hello World" << endl;

  return 0;
}

// the programme will print text "Hello World" to the console.
```

### Syntax

`#include <iostream>` is a header file library that lets us work with input and output objects, such as cout (used in line 5). Header files add functionality to C++ programs.

## Variables

There are seven inner variables in the C++ language.

| type         | keyword |
| ------------ | ------- |
| Integer      | int     |
| Boolean      | bool    |
| Float        | float   |
| Double float | double  |
| Empty        | void    |
| Width Char   | wchar_t |

- The type of `wchar_t` comes from `typedef short int wchar_t`. As a result, 'wchar_t' has the same space as'short int'.

Variables can use type modifiers for modification.
