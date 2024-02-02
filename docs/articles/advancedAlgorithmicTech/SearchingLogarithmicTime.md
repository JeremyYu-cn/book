## Binary Search

```javascript
function binarySearch(arr, target, i, j) {
  if (i === j) {
    return arr[i] === target;
  } else {
    const rest = (i + j) / 2;
    if (arr[rest] === target) return true;
    else if (arr[rest] > target) {
      return binarySearch(arr, target, rest, i);
    } else {
      return binarySearch(arr, target, i, rest);
    }
  }
}
```

- Recursion（递归）: A procedure that calls itself one or multiple times, on different inputs.

- Running Time: O(log n)

  - Example to calculate it:

    T(n) <= T(n / 2) + 4

    ==> T(n / 4) + 8

    ...

    ==> T(n / 2^i) + 4i

    ...

    ==> T(n / 2^log(n) -1) + 4(logn - 1)

    ==> log n

### Divide and Conquer

- Split the input into smaller sub-instances.

- Solve each sub-instance separately.

- Combine the solutions of the sub-instances into a solution for the problem.

- Often: For each sub-instance, the algorithm calls itself to solve it `(recursion)`.

- The instances become so small that they can be solved via a `brute force` algorithm.

## Majority

### Finding majority in an array

- Given an array of `n` numbers, a majority element is one that appears more than `n/2` times in the array.

- (Ignoring rounding issues, otherwise `ceil(n/2)` times).

- Example

```javascript
function Majority(arr) {
  const len = arr.length;
  const res = [];

  if (len === 0) return false;

  for (let i = 1; i <= len / 2; i++) {
    if (arr[2 * i - 2] === arr[2 * i - 1]) {
      res.push(arr[2 * i - 1]);
    }
  }

  return res;
}
// [10, 6, 10]
```

- Lemma: If `x` is a majority element in `A`, then `x` is a majority element in `B`.

Proof of correctness of Majority (assuming Lemma): By induction:

- `Base case`: Majority(B) works correctly for array B of size 1.

- `Inductive step`: Assume that Majority(B) works correctly for array B of size smaller than |A| (inductive hypothesis).

- `Case 1` (There is a majority element in A): Then by the Lemma, it is also a majority element in B. Majority(B) will output it, by the inductive hypothesis and the last step of Majority(A) will output it.

- `Case 2` (There is not a majority element in A): Then the last step of Majority(A) will reject any candidate majority elements returned from Majority(B).

### Proof by contradiction （反证法）

- We want to prove that statement S is true.

- We assume that the statement is not true.

- We reach a conclusion which cannot possibly be true.

### Proof of the lemma

- Assumption: Suppose to the contrary, that x is a majority element in A but not a majority element in B.

- Let m be the number of occurrences of x in A.

- Let k be the number of occurrences of x in B.

- By the assumption, it follows that other values appear at least k times in B.

- This means that other values appear in A at least:

  - 2k times from the pairs that are represented in B by a value different than x plus

  - m-2k times, since each occurrence of x in A that is not paired with another x is paired with

  some other value (since there are 2k pairs xx, there are m-2k other occurrences of x in A).

- In total, this gives 2k+(m-2k) = m occurrences, which contradicts the fact that x is a majority in A.

### Running Time

n
