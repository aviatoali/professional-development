# All About Arrays - Union

## Concat

This can be done simply using the `concat` function:

```javascript
const union = myArray1.concat(myArray2);
```

## Spread operator

Also easy to do using the spread operator:

```javascript
const union = [...myArray1, ...myArray2];
```

which is also shorter when you're concatenating a lot of arrays. Compare:

```javascript
const union = myArray1.concat(myArray2).concat(myArray3).concat(myArray4);
const union = [...myArray1, ...myArray2, ...myArray3, ...myArray4];
```

[Back](./001-introduction.md)
