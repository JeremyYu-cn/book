## 线性表

- 线性表是最常用且最简单的一种数据结构，一个线性表是 n 个数据元素的有限序列。

## 线性表的顺序表示和实现

- 线性表的顺序指的是用一组地址连续的存储单元**依次存储**线性表的数据元素。

- 线性表动态分配内存

```c

#define LIST_INIT_SIZE  100 // 线性表存储空间的初始分配量

#define LISTINCREMENT 10 // 线性表存储空间的分配增量

typedef struct {
  ElemType  *elem; // 存储空间基址
  int length;   // 长度
  int listsize; // 当前分配的存储容量
} SqList

Status InitListSq(SqList &L) {
  L.elem = (ElemType *)malloc(LIST_INIT_SIZE * sizeof(ElemType));

  if (!L.elem) exit(OVERFLOW);
  L.length = 0;
  L.listsize = LIST_INIT_SIZE;
}

```

- 线性表插入元素，从最后一位开始到第 n 位，所有元素往后移动 1 位。再将元素插入第 n 位
- 线性表删除元素，从最后一位开始到第 n 位，所有元素往前移动 1 位

## 线性表的链式表示和实现

- 链式存储结构的特点是用一组任意的存储单元存储线性表的数据元素(可以是连续的，也可以是不连续的)

```c

// 线性单链接存储结构

typedef struct LNode {
  ElemType  data;
  struct LNode * next;
}LNode, * LinkList

```
