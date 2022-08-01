# All About Arrays - Filter

```javascript
const myArray = [{ name: 'Alex', valid: true }, { name: 'Sarah', valid: false }];
const validItems = myArray.filter(item => item.valid);
```

This will give us an array of only those items that have a truthy `valid` value.

Most of these array functions that traverse the array will have extra function parameters passed to the callback function. In this case:

```javascript
myArray.filter((item, index, array) => {});
```

[Back](./001-introduction.md)
