# All About Arrays - Comparison

You may find yourself wanting to see if two arrays have all the same values in the same order. There isn't a built-in way to do this! Lots of people use libraries like `lodash` for this, but at least for shallow equality checks, you can actually pull this off pretty easily with built-in functions:

```javascript
const myArray1 = [1, 2, 3, 4, 5];
const myArray2 = [1, 2, 3, 4, 5];
const arraysAreEqual = myArray1.every((item, index) => item === myArray2[index]);
```

For deep equality, you'll have to do some extra stuff that will probably depend on what you're trying to accomplish. Or use a library.

[Back](./001-introduction.md)
