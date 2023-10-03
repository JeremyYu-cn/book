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

### Data Types

| type    | size         |
| ------- | ------------ |
| boolean | 1 byte       |
| char    | 1 byte       |
| int     | 2 or 4 bytes |
| float   | 4 bytes      |
| double  | 8 bytes      |

## User Input

`cin` is a predefined variable that reads data from the keyboard with the extraction operator `>>`.

## Operators

### Arithmetic Operators

| Operator | Name           |
| -------- | -------------- |
| +        | Add            |
| -        | Subtraction    |
| \*       | Multiplication |
| /        | Division       |
| %        | Modulus        |
| ++       | Increment      |
| --       | Decrement      |

### Assignment Operators

| Operator |
| -------- |
| =        |
| +=       |
| -=       |
| \*=      |
| /=       |
| %=       |
| &=       |
| \|=      |
| ^=       |
| >>=      |
| <<=      |

### Comparison Operators

| Operator | Name                     |
| -------- | ------------------------ |
| ==       | Equal to                 |
| !=       | Not equal                |
| >        | Greater than             |
| <        | Less than                |
| >=       | Greater than or equal to |
| <=       | Less than or equal to    |

### Logical Operators

| Operator | Name        |
| -------- | ----------- |
| &        | Logical and |
| \|       | Logical or  |
| !        | Logical not |

## Strings

A string variable contains a `collection of characters` surrounded by `double quotes`

### Omitting Namespace

- The `using namespace std` line can be omitted and replaced with the std keyword, followed by the :: operator for `string` (and `cout`) objects:

```c++
#include <iostream>

int main() {
  std::cout << "Hello World";
  return 0;
}

```

```c++
#include <iostream>
#include <string>

using namespace std;

namespace test
{
  string testStr = "Hello Test";
}

int main()
{
  cout << test::testStr << endl;
  return 0;
}
```

## Math

```c++
#include <cmath>
#include <iostream>

using namespace std

int main() {
  cout << max(5, 10);
  cout << min(5, 10);
  cout << sqrt(9);
  cout << round(5.6);
  cout << log(2);
}

```

## Conditions

```c++
#include <iostream>
#include <string>

using namespace std;

int main()
{
  int x = 10;
  int y = 20;

  if (x > 10)
  {
    cout << "x greater than 10 \n";
  }
  else if (x <= 10)
  {
    cout << "x less than 10 \n";
  }

  string res = y > x ? "y greater than x" : "x greater than y";

  cout << res << "\n";

  return 0;
}
```

## Array

```c++
#include <iostream>

using namespace std;

int main()
{
  int arr[] = {1, 2, 3, 4, 5};

  for (int i : arr)
  {
    cout << i << " ";
  }

  return 0;
}
```

### sizeof

- `sizeof` will return the array length of `byte`, not the array length;

```c++
#include <iostream>

int main() {
  int arr[] = {1,2,3,4,5};
  for (int i = 0; i < sizeof(arr) / sizeof(int); i++) {
    cout << arr[i] << " ";
  }

  return 0;
}

```

## Structures

> Structures (also called structs) are a way to group several related variables into one place. Each variable in the structure is known as a member of the structure.

> Unlike an array, a structure can contain many different data types (int, string, bool, etc.).

```c++
#include <iostream>

using namespace std;

struct Test
{
  int myNum;
  string myString;
};

int main()
{
  Test t1;
  t1.myNum = 1;
  t1.myString = "t1";

  cout << t1.myNum << "\n"
       << t1.myString;
  return 0;
}
```

## Creating References

> A reference variable is a "reference" to an existing variable, and it is created with the & operator

```c++
#include <iostream>

using namespace std;

int main() {
  string str = "string";
  string &oldStr = str;
  str = "newString";

  cout << str + "\n" + oldStr;
}

```
