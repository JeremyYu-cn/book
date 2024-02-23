## Weighted Interval Scheduling 加权区间调度

### Definition of Dynamic programming

- A technique for solving optimisation problems.

- The paradigm of dynamic programming:

- Given a problem P, define a sequence of subproblems, with the following properties: (定义一系列的子问题)

  - The subproblems are ordered from the smallest to the largest. 从小问题到大问题

  - The largest problem is our original problem P. 最大的问题是 P

  - The optimal solution of a subproblem can be constructed from the optimal solutions of sub-sub-problems. (Optimal Substructure). 子问题的最优解可以被更小的子子问题最优解解决

- Solve the subproblems from the smallest to the largest. When you solve a subproblem, store the solution (e.g., in an array) and use it to solve the larger subproblems.

### Definition of Weighted Interval Scheduling

- A set of requests {1, 2, ... , n}.

  - Request i has a starting time s(i), a finishing time f(i), and a value v(i).

  - Alternative view: Every request is an interval [s(i), f(i)] associated with a value v(i).

- Two requests i and j are compatible if their respective intervals do not overlap.

- Goal: Output a schedule which maximises the total value of compatible intervals.

## Subset Sum

## Knapsack
