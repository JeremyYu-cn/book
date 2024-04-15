## Profit Maximization

- Goal: Maximize the profit.

- Allocation Algorithm: Give the object to the player with the `highest bid`.

- Payment Scheme: The winner pays an amount equal to the `second highest bid`.

### Bayesian Setting

- Sometimes it makes sense to assume that some partial information is known. （部分数据已知）

- Assume that the valuations come from a known probability distribution. The distribution is common knowledge! （估值来自一个概率分布， 这个分布是一个 knowledge）

- Assume that you have a single player with v1∼U[0,1].

- What sort of mechanism would we devise to maximize the expected revenue?

  - We post a price p
  - if v≥ p we give the item to the bidder at price p
  - if v < p we keep the item

- What is the optimal price p?

![alt text](images/image_98.png)

The optimal price is p=1/2 and gives us expected revenue 1/4.

### Second Price Auction

- Assume that there are two players with v1,v2∼U[0,1].

- What is the expected revenue that we get from the second price auction?

` - Truthful auction: we consider b1(v1)=v1, b2(v2)=v2.

![alt text](images/image_99.png)

- Answer: 1/3.
