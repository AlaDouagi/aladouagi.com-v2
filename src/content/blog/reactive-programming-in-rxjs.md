---
title: 'Reactive programming in RxJS'
publishDate: 2023-07-20 00:00:00
img: /assets/blog-ogs/reactive-programming-in-rxjs.png
description: Short introduction to Reactive programming in JavaScript.
tags:
  - JavaScript
  - Reactive Programming
  - RxJS
  - Async
---

#### My personal experience with Reactive Programming and RxJS

At the beginning of my career as a Web Developer in 2016, I had a chance to work
with Angular 2 a bit, it was challenging for me as a Junior developer to
understand what was going on with the "Reactive" functions that are used
everywhere.\
I had to work with React.js apps after that short experience, but I did not get
the chance to master Reactive Programming until I got back to work on an Angular
code base when I was more mature and had expertise with functional programming,
and I enjoyed working with it after all!\
So that's why I had this idea of sharing a blog post about Reactive Programming
& RxJS with some simple examples.

### Reactive Programming in RxJS with Examples

Reactive programming has taken the software development world by storm. In
essence, it is an asynchronous programming paradigm concerned with data streams
and the propagation of change. This means that it becomes possible to express
static (e.g., arrays) or dynamic (e.g., event emitters) data streams with ease
and also to react to the data's changes.

JavaScript developers, in particular, are lucky to have access to one of the
most mature reactive programming libraries available: ReactiveX's RxJS.

#### What is RxJS?

RxJS (Reactive Extensions for JavaScript) is a library for reactive programming
using Observables, to make it easier to compose asynchronous or callback-based
code. The Observable object represents the idea of an invokable collection of
future values or events. In other words, it models a collection that arrives
over time.

#### Reactive Programming in RxJS

In traditional imperative programming, we tell the computer what to do and how
to do it. However, with reactive programming, we express what we want, and the
underlying library decides how to achieve it. In a nutshell, it's more about
declaring what you need and less about how to get it.

Observables lie at the core of RxJS. They provide a stream of data. Subscribers
(observers) can listen to this stream and react to any changes that may occur.
The beauty of RxJS comes from the way it allows you to manipulate these data
streams.

For instance, suppose we have a stream of click events from a button. We can
filter, transform, combine, and do much more with these streams using a wide
array of operators provided by RxJS. This leads to an extremely powerful way of
handling asynchronous operations, events, and complex flows of data.

#### RxJS in Practice: Examples

To truly understand RxJS, let's see it in action through the following examples.

##### 1. Basic Observable and Subscription

Firstly, let's start with creating a simple Observable and subscribing to it.

```javascript
import {Observable} from 'rxjs'

const observable = new Observable((subscriber) => {
  subscriber.next('Hello')
  subscriber.next('World')
  subscriber.complete()
})

observable.subscribe((value) => console.log(value))
```

In this code, we first create an Observable that sends 'Hello' and 'World' to
its subscribers. Then, we subscribe to this Observable and log any value we
receive.

##### 2. Observables from Events

RxJS can create Observables from various sources, including DOM events.

```javascript
import {fromEvent} from 'rxjs'

const clicks = fromEvent(document, 'click')

clicks.subscribe((click) => console.log(click))
```

Here, we create an Observable `clicks` that emits a value every time a click
event occurs on our document. Then, we subscribe to this Observable and log the
click event.

##### 3. Transformation of Data with Map

RxJS provides numerous operators to transform, filter, combine, and much more
with your data streams. Let's use `map` to transform our data.

```javascript
import {fromEvent} from 'rxjs'
import {map} from 'rxjs/operators'

const clicks = fromEvent(document, 'click')
const positions = clicks.pipe(
  map((click) => ({x: click.clientX, y: click.clientY})),
)

positions.subscribe((pos) => console.log(`Clicked at: ${pos.x}, ${pos.y}`))
```

In this example, we use the `map` operator to transform our click events into an
object with `x` and `y` properties.

##### 4. Combining Observables

Sometimes, we need to combine multiple streams of data. RxJS has got us covered
with numerous combination operators like `merge`, `concat`, `combineLatest`,
etc. Let's use `merge` to combine two streams.

```javascript
import {fromEvent, merge} from 'rxjs'

const clicks = fromEvent(document, 'click')
const keys = fromEvent(document, 'keydown')

const events = merge(clicks, keys)

events.subscribe((event) => console.log(event))
```

In this example, we create two Observables: one for click events and one for
key-down events. We then merge these two streams into one and subscribe to it.
We'll receive data from both streams in our subscription.

#### Conclusion

RxJS and its approach to reactive programming can be a game-changer for your
JavaScript applications.\
Asynchronous and event-based programs can be written more intuitively and are
more maintainable with a high level of abstraction offered by RxJS.

Remember, the key to RxJS is practice. The more you use it, the more natural it
will become, and the more power you'll be able to derive from it.\
So, start experimenting with Observables and operators, and soon you'll be
controlling complex data streams with ease.
