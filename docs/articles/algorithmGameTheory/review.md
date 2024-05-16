## Outline

- Load-Balancing Games (Ch. 20)

- Routing Games (Ch. 18)

- Formation Games (Ch.19)

- Introduction to Mechanism Design (Ch. 9)

- Mechanisms Without Money (Ch. 10)

- Combinatorial Auctions (Ch. 11)

- Profit Maximization (Ch. 13)

## Network Games

- Bandwidth sharing game 带宽分享游戏

  - Utility player i : ui(x1, ... , xn) = xi · (1− Sum^n^j=1 xj)

  - A strategy vector s ∈ S is a pure Nash equilibrium, if for each player i , and each alternate strategy si′ ∈ Si , we have that ui(si,s−i) ≥ ui(si′,s−i).

  - A strategy vector s ∈ S is a dominant strategy solution, if for each player i , and each alternate strategy vector s′ ∈ S , we have that ui(si,s′−i) ≥ ui(si′,s′−i).

- Load Balancing Games 负载平衡游戏

  - Makespan scheduling on uniformly related machines：

    1. n tasks with weights w1,...,wn

    2. m parallel machines with speeds s1, ... , sm

       - identical machines: s1 = s2 = ··· = sm = 1

       - uniformly related machines: else

    3. A:[n] → [m].. assignment of tasks to machines

    4. The load of machine j∈[m] under the assignment A is:

       - lj= sum wi / sj

    5. Objective: minimize the makespan, aka the maximum load overall machines

  - Pure Nash equilibrium

    - An assignment A is a pure Nash equilibrium if for all players i ∈ [n] and all machines j ∈ [m]:

      lA(i) ≤ lj + wi / sj

  - Computing pure Nash equilibria

    - LPT (important!): The Largest Processing Time (LPT) scheduling algorithm computes a pure Nash equilibrium in polynomial time.

    - LPT algorithm

      1. Start with empty assignment: lj := 0 for all j ∈ [m]

      2. Sort task in non-increasing order w1 ≥ w2 ≥ ··· ≥ wn

      3. For i from 1 to n do

         - A(i) := arg min j∈[m] { lj + wi }

         - lA(i) := lA(i) + (wi / sj)

         - return A

    - Every instance of the load balancing game admits a pure Nash equilibrium.

  - Improvement step: change to best response

    - Single player moves his task to the machine that minimizes his cost.

    - Theorem 2.3: For every instance of the load balancing game with related machines every best response sequence terminates.

    - Theorem 2.4: For identical machines the length of any sequence of best responses is at most 2^n.

    - Theorem 2.5: Let A : [n] 7→ [m] denote any assignment of n tasks to m identical machines. Starting from A, the max-weight best response policy reaches a pure Nash equilibrium after each agent was activated at most once.

    - Lemma 2.6: Suppose task i makes a best response: For all tasks j with wj ≥ wi, if j was satisfied before, it remains satisfied after i’s best response.

  - PoA (Price of Anarchy): The worst case ratio between the social cost in some Nash equilibrium (NE) and the optimum social cost.

    PoA = max (cost(P) / opt(G))

  - Upper bound α: show that for all such instances and all such equilibria the PoA is at most α.

  - Lower bound α: find such an instance and such an equilibrium where the PoA is at least α.
