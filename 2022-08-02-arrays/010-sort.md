# All About Arrays - Sort

## Basic Usage

`sort` is another in-place method:

```javascript
const myArray = [1, 5, 7, 4, 2, 3, 6, 9, 8];
myArray.sort();
```

Now `myArray` is sorted. So again, if you didn't want to modify `myArray`, you'll want to copy it first:

```javascript
const myArraySorted = [...myArray].sort();
```

## Callback

`sort` can take a callback, which allows you to decide how the array will be sorted:

```javascript
const myArraySortedDescending = myArray.sort((a, b) => b - a);
```

This callback function expects the following return values:

| Return value     | Meaning                |
|------------------|------------------------|
| Positive integer | a should come before b |
| Negative integer | b should come before a |
| Zero             | a and b are the same   |

If you're comparing strings, you may want to use the built-in `localeCompare` function:

```javascript
["Alex", "Scotty", "Guse", "Lindsey"].sort((a, b) => a.localeCompare(b));
```

[Back](./001-introduction.md)
