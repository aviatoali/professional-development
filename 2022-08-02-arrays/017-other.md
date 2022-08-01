# All About Arrays - Other

## Array.isArray

```javascript
const myObject = {};
const myArray = [];
Array.isArray(myObject); // false
Array.isArray(myArray); // false
```

## keys and values

We talked about iterators before. `keys` and `values` will give you iterators that iterate over either the, you guessed it, keys or values of the array.

```javascript
const myArray = [1, 2, 3];
myArray.keys();
myArray.values();
```

## entries

Same deal except that it iterates over tuples of each key and value together, i.e.

```javascript
const myArray = [1, 5, 9];
const iterator = myArray.entries();
iterator.next(); // [0, 1]
iterator.next(); // [1, 5]
iterator.next(); // [2, 9]
```

## copyWithin

This is a little bit like `splice` in that it modifies a range of your array. But this one copies some data inside of the array to another place inside of the array:

```javascript
const myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
myArray.copyWithin(2, 6, 8);
```

This says "starting at position 2, replace the values in the array with the values in the array from position 6 to position 8, not including position 8."

`myArray` now has this in it:

```javascript
[1, 2, 7, 8, 5, 6, 7, 8, 9]
```

You probably won't ever use this.

[Back](./001-introduction.md)
