# All About Arrays - Removing Items

## pop

The opposite of `push` is `pop`, which will remove an item from the end of an array:

```javascript
const myArray = [1, 2, 3];
const lastItem = myArray.pop();
```

Now `lastItem` is `3` and `myArray` is `[1, 2]`.

## shift

As mentioned in the previous section, `shift` will remove the zeroth item from the array:

```javascript
const myArray = [1, 2, 3, 4, 5];
myArray.shift();
```

and now `myArray` is `[2, 3, 4, 5]`.

## slice

This function does *not* modify your original array! It allows you to grab a slice of an array.

```javascript
const myArray = [1, 2, 3, 4, 5];
const mySlice = myArray.slice(1, 2);
```

This says "give me a slice of the array from item 1 to item 2".

`myArray` has remained the same, but `mySlice` is `[2, 3]`.

You can leave off the second parameter and it just means "keep going until the end of the array". So:

```javascript
const myArray = [1, 2, 3, 4, 5];
const mySlice = myArray.slice(2);
```

gives us `[3, 4, 5]`.

You can also put in a negative number:

```javascript
const myArray = [1, 2, 3, 4, 5];
const mySlice = myArray.slice(-2);
```

So, "give me a slice of the array from the second item from the right until the end of the array (on the right side)", which in this case gives us `[4, 5]`.

You can also use a negative number for the second parameter:

```javascript
const myArray = [1, 2, 3, 4, 5];
const mySlice = myArray.slice(0, -2);
```

which gives us `[1, 2, 3]`.

[Back](./001-introduction.md)
