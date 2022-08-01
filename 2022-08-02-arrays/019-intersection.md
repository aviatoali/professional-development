# All About Arrays - Intersection

No built-in way to accomplish this either, unfortunately. But we can get this ourselves:

```javascript
const myArray1 = [1, 2, 3, 4, 5, 6];
const myArray2 = [4, 5, 6, 7, 8, 9];
const intersection = myArray1.filter(item => myArray2.includes(item));
```

[Back](./001-introduction.md)
