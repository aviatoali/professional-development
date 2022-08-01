# All About Arrays - Reversal

Something to remember about array methods is that very few of them actually modify the original array. However, `reverse()` is one that does the operation *in place*.

```javascript
const myArray = [1, 2, 3];
myArray.reverse();
```

`myArray` is now `[3, 2, 1]`. So you may want to copy the array first before you operate on it:

```javascript
const newArray = [...myArray].reverse();
```

Note: there is a [new proposal](https://github.com/tc39/proposal-change-array-by-copy) to create new versions of these sorts of functions that do not modify the original array.

[Back](./001-introduction.md)
