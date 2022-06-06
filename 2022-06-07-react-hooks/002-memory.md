# React Hooks — Memory

## What are values and references?

There are two ways to think of a variable: a value, or a reference.

Strings, numbers, booleans, and `null` are values, but arrays, objects, and functions are references. (Functions in JavaScript are special, callable objects).

What this means:

```javascript
let number = 1;
let fruit = ['Apple', 'Banana', 'Orange'];

let newNumber = number;
let newFruit = fruit;

newNumber += 1;
newFruit.push('Peach');
```

What are the values of `number` and `newNumber`?

Yes, you guessed it, `number` is still `1`, but `newNumber` is now `2`. That's because the `number` variable represents a *value*, and not a reference to a value. So when you do `newNumber = number`, it's setting `newNumber` to whatever *value* `number` had.

But what are `fruit` and `newFruit` now?

They're both `['Apple', 'Banana', 'Orange', 'Peach']`. In fact, `fruit === newFruit` is `true`. But *why*?

Because `fruit` represents a *reference* to the array that holds the fruit. When you do `newFruit = fruit`, you're telling `newFruit` to reference the same array! So even though we "only" modified `newFruit`, we actually modified the array that both of them reference!

### A low-level explanation

Consider this fake set of memory addresses:

| Address | Value  |
| ------- | ------ |
| 0xFF35  | 1      |
| 0xFF36  | 0xFF37 |
| 0xFF37  | Apple  |
| 0xFF38  | Banana |
| 0xFF39  | Orange |

Now let's say we have this code:

```javascript
let number = 1;
let fruit = ['Apple', 'Banana', 'Orange'];
```

So in the compiled code, it's essentially saying:

```javascript
let number = WHATEVER IS IN 0xFF35
let fruit = WHATEVER IS IN 0xFF36
```

So there's a value, `1` in `0xFF35`. But there's an address in `0xFF36`!

So if I do this:

```javascript
let newNumber = number;
let newFruit = fruit;
```

This is what my memory now looks like:

| Address | Value  |
| ------- | ------ |
| 0xFF35  | 1      |
| 0xFF36  | 0xFF37 |
| 0xFF37  | Apple  |
| 0xFF38  | Banana |
| 0xFF39  | Orange |
| 0xFF3A  | 1      |
| 0xFF3B  | 0xFF37 |

and

```javascript
number = WHATEVER IS IN 0xFF35
fruit = WHATEVER IS IN 0xFF36
newNumber = WHATEVER IS IN 0xFF3A
newFruit = WHATEVER IS IN 0xFF3B
```

So while `fruit` and `newFruit` point to different addresses, what's *in* the addresses points to the same array!

So if I do this:

```javascript
newFruit = ['Grapes', 'Strawberries', 'Watermelon'];
```

Now our memory looks like this:

| Address | Value        |
| ------- | ------------ |
| 0xFF35  | 1            |
| 0xFF36  | 0xFF37       |
| 0xFF37  | Apple        |
| 0xFF38  | Banana       |
| 0xFF39  | Orange       |
| 0xFF3A  | 1            |
| 0xFF3B  | 0xFF3C       |
| 0xFF3C  | Grapes       |
| 0xFF3D  | Strawberries |
| 0xFF3E  | Watermelon   |

But we still have

```javascript
number = WHATEVER IS IN 0xFF35
fruit = WHATEVER IS IN 0xFF36
newNumber = WHATEVER IS IN 0xFF3A
newFruit = WHATEVER IS IN 0xFF3B
```

So, newFruit still cares about whatever is in 0xFF3B, but that address now points to a different array.

This will be important later on.

## What is memoization?

The concept of memoization is simple: storing the result of a function call in memory. A very simple example:

```javascript
function add(x, y) {
  return x + y;
}
```

`add` is an idempotent function, which means that given a specific input, it always has the same output. This is very important as you don't want to use memoization in other cases.

When I call `add(1, 2)` it's going to call this function, calculate `1 + 2` (which, for our purposes, we're going to pretend is a very expensive calculation), and return the result. If I only need to call this once in a given user session, that's fine. But if I'm going to do it a bunch, I probably don't want to recalculate that every time. Instead, I can memoize the function:

```javascript
const memoizedAdd = memoize(add);
```

So now, the first time I call `memoizedAdd(1, 2)`, it will actually call `add` and compute the result. But the second time I call it with those same parameters, it's going to look up the previous result in memory and return it. So `add` does not get called!

[Here's](./examples/002.01.js) a simple implementation of `memoize`.

Note that the comparison here, the `===` is called a "shallow equals," meaning that values and references are compared, but not the actual contents of any arrays or objects those references are pointing to!

Next: [Component Lifecycles](./003-component-lifecycles.md).
