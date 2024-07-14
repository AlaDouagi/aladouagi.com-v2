---
title: 'Functional Programming in JavaScript using lodash/fp and Ramda'
publishDate: 2023-07-11 00:00:00
img: /assets/blog-ogs/functional-programming-in-javascript-using-lodash-fp-and-ramda.png
description: Short introduction to functional programming.
tags:
  - JavaScript
  - Functional Programming
  - Lodash
  - Ramda
---

### Introduction

Functional Programming (FP) is a programming paradigm that treats computation as
the evaluation of mathematical functions and avoids changing state and mutable
data.\
It is a declarative style of programming, focusing on what the program should
accomplish without specifying how the program should achieve the result.\
This article explores functional programming in JavaScript, providing examples
using `lodash/fp` and `Ramda`, two JavaScript libraries for functional
programming.

### Understanding Functional Programming

Functional programming includes the following key concepts:

1. **Pure Functions**: A function is said to be pure if it always returns the
   same result for the same input and it doesn't have any observable side
   effect.

2. **Immutability**: Data is unchanging, meaning that we create new data
   structures instead of altering existing ones.

3. **First-class functions**: Functions can be passed as arguments to other
   functions, returned by other functions, and assigned as a value to a
   variable.

4. **High-order functions**: These are functions that take one or more functions
   as arguments and return a function as its result.

#### Functional Programming with lodash/fp

`lodash/fp` is a set of utility functions for functional programming tasks. All
the lodash utility functions are available in a functional programming-friendly
style, meaning they are automatically curried, and iteratees are capped.

##### Example 1: Using map and reduce

```javascript
import {flow, map, multiply, reduce, add} from 'lodash/fp'

const nums = [1, 2, 3, 4, 5]

const doubleAndSum = flow(map(multiply(2)), reduce(add, 0))

console.log(doubleAndSum(nums)) // Output: 30
```

In this example, `fp.flow` is used to create a new function that transforms the
input array by doubling its elements (using `fp.map`) and then summing them
(using `fp.reduce`).

#### Functional Programming with Ramda

`Ramda` is another JavaScript library that facilitates functional programming.
It is lightweight and fast, as it doesn't extend the prototypes of JavaScript's
built-in objects, making it a better option for functional programming in some
cases.

##### Example 2: Using compose and filter

```javascript
import {compose, map, multiply, filter, modulo, equals, __} from 'ramda'

const nums = [1, 2, 3, 4, 5, 6]

const getEvenAndDouble = compose(
  map(multiply(2)),
  filter(compose(equals(0), modulo(__, 2))),
)

console.log(getEvenAndDouble(nums)) // Output: [4, 8, 12]
```

In this example, `R.compose` is used to create a new function that first filters
the even numbers in the input array (using `R.filter`) and then doubles them
(using `R.map`).

### Summary

Functional programming is a powerful paradigm that can help you write cleaner,
more modular, and more testable code. `lodash/fp` and `Ramda` are two libraries
that provide a host of utility functions to aid with functional programming in
JavaScript.\
By understanding and utilizing these tools effectively, you can create
applications that are easier to read, debug, and maintain.

---

I hope this article helps you in your journey to functional programming in
JavaScript. Happy coding!
