# All About Arrays - Difference

No built-in way, but easy to get:

```javascript
const myArray1 = [1, 2, 3, 4, 5, 6];
const myArray2 = [4, 5, 6, 7, 8, 9];
const intersection = myArray1.filter(item => !myArray2.includes(item));
```

This gives the asymmetric difference. If you want symmetric, just do:

```javascript
const myArray1 = [1, 2, 3, 4, 5, 6];
const myArray2 = [4, 5, 6, 7, 8, 9];
const intersection = myArray1
  .filter(item => !myArray2.includes(item))
  .concat(
    myArray2.filter(item => !myArray1.includes(item))
  );
```

[Back](./001-introduction.md)
