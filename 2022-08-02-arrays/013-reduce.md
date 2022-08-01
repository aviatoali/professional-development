# All About Arrays - Reduce

## Examples

Oh yay, the reducer. Everyone's favorite. A reducer takes in a starting value and iterates over an array, running a callback for each value in the array and returning a new accumulated value based on the value at the current index and the value that has been accumulated so far.

The simplest usage of a reducer is to calculate a sum:

```javascript
const points = [10, 20, 50];
const totalPoints = points.reduce((total, current, index) => total + current, 0);
```

Let's step through each iteration of this function.

| Total | Current | Index | New total    |
| ----- | ------- | ----- | ------------ |
| 0     | 10      | 0     | 0 + 10 = 10  |
| 10    | 20      | 1     | 10 + 20 = 30 |
| 30    | 50      | 2     | 30 + 50 = 80 |

So `totalPoints` is `80`.

Another example is to run a pipeline of operations. Imagine you had some functions that you were reusing in different ways, but you wanted to perform a "pipeline" of these functions on your data. You could take those atomic functions and apply them to your data like this:

```javascript
const increment = x => x + 1;
const double = x => x * 2;
const multiplyBy100 = x => x * 100;

const pipeline = [increment, double, multiplyBy100];

const initialValue = 10;
const result = pipeline.reduce((total, func) => func(total), 10);
```

This is effectively the same as doing this:

```javascript
const result = (initialValue + 1) * 2 * 100;
```

But if you needed to make your calculations more complex, you could do it simply and clearly but just changing the pipeline.

## A Warning

A reducer can be used for a *ton* of things. But unless your code is very clear about what the reducer is doing, you might be introducing something that is hard to maintain. Beware of using it for things where other, clearer functions could do the job.

```javascript
const players = [
  { name: 'Alex', items: ['Sword', 'Shield' ]},
  { name: 'Adam', items: ['Apple', 'Potion' ]}
];

const items = players.reduce((items, player) => [...items, ...player.items], []);
```

This *does* give you a flat array of all of the players' items. But is it clearer than this?

```javascript
const items = players.flatMap(player => player.items);
```

Probably not.

[Back](./001-introduction.md)
