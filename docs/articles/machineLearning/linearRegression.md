## Linear Regression Model

- Training set: Data used to train the model

- Notation: x = "input" variable feature; y = "output" variable; m = number of training examples

training set -> learning algorithm -> function (model to predition y)

- Linear regression with `one` variable.

## Cost Function

- Cost function: Squared error cost function. (The most commonly used one for linear regression)

  > This is the formula of `markdown`, but on the website it does not work, so I will post an image to show the formula.

  $$
  \frac{1}{2m} \sum_{i=}1^m\(y1^i - y^i\)^2
  $$

  ![cost function](https://img.yzmblog.top/MachineLearning/costFunction.jpg)

- notation:
  - m = number of training examples
  - By Convention, the cost function that machine learning people use actually divides by 2 times m, which just meant to make some of our later calculations look neater.
