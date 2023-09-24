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
  - By convention, the cost function that machine learning people use actually divides by 2 times m, which just meant to make some of our later calculations look neater.

- The goal of linear regression is to find the parameters w or w and b that result the smallest possible value for the cost function J. (J is a cost function)

## Example

### Linear Regression Example

```python
import numpy as np
import matplotlib.pyplot as plt

# data set
x_train = np.array([1.0, 2.0])
y_train = np.array([300.0, 500.0])

# Linear regression parameters f_wb = w * x^i + b
w = 200
b = 100

# To compute the prediction of a linear model
def compute_model_output (x, w, b):
    num = len(x)
    f_wb = np.zeros(num)
    for i in range(num):
        f_wb[i] = w * x[i] + b

    return f_wb

tmp_f_wb = compute_model_output(x_train, w, b)

plt.plot(x_train, tmp_f_wb, c='b',label='Our Prediction')

plt.scatter(x_train, y_train, marker = 'x', c = 'r')
plt.title('test')
plt.ylabel('Price (in 1000s of dollars)')
plt.xlabel('Size (1000 sqft)')
plt.show()
```

![Linear regression plot](https://img.yzmblog.top/MachineLearning/linear_example_plot.jpg)

### Cost Function Example

```python
# Cost Function

import numpy as np
import matplotlib as plt


# dataset
x_train = np.array([1.0, 2.0])           #(size in 1000 square feet)
y_train = np.array([300.0, 500.0])           #(price in 1000s of dollars)


def compute_cost(x, y, w, b):
    num = len(x)

    cost_num = 0
    for i in range(num):
        f_wb = w * x[i] + b
        cost = (f_wb - y[i]) ** 2
        cost_num += cost
    total_cost = (1 / 2 * num) * cost_num
    return total_cost
```
