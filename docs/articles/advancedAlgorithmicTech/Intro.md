## Algorithmic techniques

- Brute force.
- Divide and Conquer.
- Greedy.
- Dynamic Programming.
- Integer linear program relaxation and rounding. (整数线性程序)
- Competitive analysis.
- Branch and Bound.

## Types of algorithms

- Searching algorithms.
- Sorting algorithms.
- Graph algorithms.
- Approximation algorithms.
- Online algorithms.
- Randomised algorithms.
- Exponential-time algorithms. (指数时间算法)

## What should we expect from algorithms?

- `Correctness`: It computes the desired output.
- `Termination`: Eventually terminates (or with high probability).
- `Efficiency`:
  - The algorithm runs fast and/or uses limited memory.
  - The algorithm produces a “good enough” outcome.

## Correctness

- Let’s look at the InsertionSort algorithm for sorting n numbers.
- Is it correct? Does it always produce a sorted sequence?
- Certainly seems to be the case, intuitively.

## Loop invariance

### Example

```typescript
// Insertion sort

function insertionSort(arr: number[]) {
  const result: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(arr[i]);

    let j = i - 1;
    while (j > 0 && arr[j + 1] > result[j]) {
      const temp = result[j + 1];
      result[j + 1] = result[j];
      result[j] = temp;
      j--;
    }
  }
}
```

- Loop invariant: The subarray A[1,...,j-1] consists of the elements originally in A[1,...,j-1] but in sorted order.

- Initialisation: Before the first iteration, the subarray is A[1], which contains the first element and is trivially sorted.

- Maintenance: We move A[j-1], A[j-2], A[j-3], ... by one position to the right, until we find the proper position for A[j]. The subarray A[1,...,j] contains the original elements and it is sorted.

- Termination: Termination happens when length[A] is reached, so the counter is j = n+1. The loop invariant for j = n+1 is the sorted sequence of the n numbers.

## Running Time

- Different computers have different speeds.
- `Random Access Machine (RAM) model.`
- Instructions:
  - Arithmetic (add, subtract, multiply, etc).
  - Data movement (load, store, copy, etc).
  - Control (branch, subroutine call, return, etc).
- `Each instruction is carried out in constant time.`
- We can count the number of instructions, or the number of steps.

## Memory Usage

- Each memory cell can hold one element of the input.
- Total memory usage = Memory used to hold the input + extra memory used by the algorithm `(auxiliary memory 辅助存储器)`.

## Worst vs Best vs Average Case

- Convention: When we say “the running time of Algorithm A”, we mean the worst-case running time, over all possible inputs to the algorithm.

- We can also measure the best-case running time, over all possible inputs to the problem.

- In between: average-case running time.

  - Running time of the algorithm on inputs which are chosen at random from some distribution.

  - The appropriate distribution depends on the application.

  - The analysis can be difficult.
