# All About Arrays - Adding Items

## push

Adding an item to the end of an array is as simple as `push`ing it onto the array:

```javascript
const myArray = [1, 2, 3];
myArray.push(4);
```

## unshift

You can also add an item to an array by unshifting it. `shift` (which will be discussed in the next section) means to remove an item from the beginning of the array. So `unshift` puts an item onto the front of the array:

```javascript
const myArray = [2, 3, 4];
myArray.unshift(1);
```

If you'd like to avoid modifying your array, you can do this easily with the spread operator:

```javascript
const myNewArray = [1, ...myArray];
```

## Spread operator

`push` is one of those methods that *does* modify the original array. If you'd like to leave the original intact, you can use the spread operator:

```javascript
const myArrayWith4 = [...myArray, 4];
```

This can also be used to push all of the items from one array onto another:

```javascript
const first = [1, 2, 3];
const second = [4, 5, 6];
const third = [...first, ...second]; // [1, 2, 3, 4, 5, 6]
```

## Concat

You can also use `concat` which will not modify the original array. 

```javascript
const myArray = [1, 2, 3];
const myArrayWith4 = myArray.concat(4);
```

It can also concatenate an entire array onto another, while leaving both untouched.

```javascript
const first = [1, 2, 3];
const second = [4, 5, 6];
const third = first.concat(second); // [1, 2, 3, 4, 5, 6]
```

## splice

You can `splice` items into an array (it *does* modify the original).

```javascript
const myArray = [1, 2, 3];
myArray.splice(1, 0, 9);
```

This says "starting at position 1, remove the next 0 spaces, put `9` into my array.

So `myArray` is now:

```javascript
[1, 9, 2, 3]
```

If that the second parameter in `splice` is non-zero, it will remove that many items from the array before it adds your specified items in. So:

```javascript
const myArray = [1, 2, 3, 4, 5];
myArray.splice(2, 2, 6, 7, 8);
```

This means "start at position 2, remove two items, and add `6`, `7`, and `8` into the array. So the result is that `myArray` is now:

```javascript
[1, 2, 6, 7, 8, 5]
```

Because `myArray` is modified in place, the return value of `splice` doesn't need to be the contents of `myArray`. Instead, it returns an array of the values that were removed. So in this case, it returned `[3, 4]`.

If you don't want to modify your original array, be sure to copy it, i.e. `[...myArray].splice()`.

[Back](./001-introduction.md)
