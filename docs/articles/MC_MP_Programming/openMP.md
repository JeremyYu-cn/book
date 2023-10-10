## What is the TSP(Traveling Salesman Problem)?

### Cheapest Insertion (最少代价插入)(动态规划)

### Farthest Insertion

## Why should I use OpenMp

- We can achieve some pretty good speed up with normal hardware

- Thread based parallelism
- Targeted at share memory
- Uses work sharing and tasks

| Process                                               | Thread                                                            |
| ----------------------------------------------------- | ----------------------------------------------------------------- |
| A basic unit of work for the operating system         | Part of a program that can be run independently to other portions |
| Big overheads in creating/detention/context switching | Small overheads in comparison                                     |
| isolate from other processes                          | Shared memory with other threads in the same process egfiles      |
|                                                       | Share heap                                                        |

## How do I use OpenMP

### The fork-join model

- Expressions

| expression                                 | description                                  |
| ------------------------------------------ | -------------------------------------------- |
| #pragma omp parallel                       |                                              |
| #pragma omp for                            |                                              |
| #pragma omp parallel shared(i)             | shared access acriss akk threads             |
| #pragma omp parallel private(i)            | Each thread gets it own copy of the variable |
| #pragma omp parallel firstprivate(i)       |                                              |
| #pragma omp parallel lastprivate(i)        |                                              |
| #pragma omp parallel for default(shared)   |                                              |
| #pragma omp parallel for reduction(+, sum) | performs some operation with the results     |
