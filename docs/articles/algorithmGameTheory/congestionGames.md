## Non-atomic congestion games: Wardrop Model

Wardrop Model

- directed graph G = (V,E)

- kcommodities,oneforeachi∈[k]

  - si , ti .. source-sink pair
  - ri .. flow demanPd to route from si to ti I normalise: r = i∈[k] ri = 1
  - Pi .. set of paths between si and ti

- P = Ui∈[k]Pi a set of paths

- ce : [0,1] → R.. latency (cost) function of edge e ∈ E

- continuous, non-decreasing, non-negative

- The triple (G,r,c) is an instance of the routing problem

- Flow and Latency:

  - Flow f: aPflow vector (fP)P∈P
  - f_e= P ∋ e f_P
  - a P flow is feasible if for all i∈[k] P ∈ Pi f_P = r_i

- C_e(f) = c_e(f_e) .. edge (lentence / cost)

- C_p(f) = Sum e ∈ P c_e(f) .. path latency

![alt text](images/image_7.png)

- Example:

Paths:

- P1=(e1,e2)........fP1 = 1 / 3
- P2 = (e1,e3,e5) ... fP2 = 2 / 3
- P3=(e4,e5)........fP3 =0

Assume path flow f = (1/3, 2/3,0).

Edge flows:

fe1 =1,fe2 = 1/3,fe3 = 2/3,fe4 =0,fe5 = 2/3.

Edge costs:

ce1(f)=1, ce2(f)=1/3 + 2/3 =1, ce3(f)=3, ce4(f)=5, ce5(f)=3 \* (2/3) =2.

Path costs:
cP1 (f ) = ce1 (f ) + ce2 (f ) = 2, cP2 (f ) = ce1 (f ) + ce3 (f ) + ce5 (f ) = 6,
cP3 (f ) = ce4 (f ) + ce5 (f ) = 7.

Total cost:

C(f) = Sum fp \* cp = 1/3 \* 2 + 2/3 \* 6 + 0 \* 7 = 14/3

C(f)= fe·ce(f)= 1·1 + 1/3 \* 1 + 2/3 \* 3 + 0 \* 5 + 2/3 \* 2 = 14/3

![alt text](images/image_8.png)

- So far,we basically just introduced a flow model.

- In the Wardrop model we assume:

  - flow is controlled by an infinite number of agents

  - each agent is responsible for an infinitesimal fraction of the flow

  - agents strive to minimise their own latency

![alt text](images/image_9.png)

- This implies: All used paths of the same commodity have the same latency.

![alt text](images/image_10.png)

![alt text](images/image_11.png)

### Optimal Flows & Wardrop Equilibria

- Suppose we are shifting flow from path P1 to P2.
- ⇒ Contribution of edges on P1 to total latency decreases, contribution of P2 increases.
- If decrease on P1 is more than the increase on P2 then total latency decreases.
- ⇒the flow was not optimal.

- Marginal Cost (边际成本)

![alt text](images/image_12.png)
