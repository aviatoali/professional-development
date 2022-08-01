# All About Arrays - Serialization

```javascript
const myArray = [1, 2, 3];
const serialized = JSON.stringify(myArray);
```

This will turn your array into JSON. But another way of getting a serialized version of an array is with `join`:

```javascript
myArray.join(', ');
```

which results in `"1, 2, 3"`. The inverse of `join` is `split`:

```javascript
'1, 2, 3'.split(', ');
```

gives you

```javascript
[1, 2, 3]
```

You can chain these together to do some neat things:

```javascript
'1, 2, 3'.split(', ').reverse().join(', ');
```

will result in

```javascript
'3, 2, 1'
```

[Back](./001-introduction.md)
