# All About Arrays - Accessing Items

It's of course very easy to access an array item by index:

```javascript
const myArray = [1, 2, 3];
myArray[0];
```

It's a little bit annoying to retrieve the last item in an array:

```javascript
myArray[myArray.length - 1];
```

But ES2022 introduced `Array.prototype.at()` which makes this much easier:

```javascript
myArray.at(-1);
```

[Back](./001-introduction.md)
