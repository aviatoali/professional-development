# All About Arrays - Search

## find

```javascript
const myArray = [{ name: 'Alex' }, { name: 'Sarah' }];
myArray.find(person => person.name === 'Alex');
```

This will return the object `{ name: 'Alex' }`.

## findIndex

```javascript
const myArray = [{ name: 'Alex' }, { name: 'Sarah' }];
myArray.findIndex(person => person.name === 'Alex');
```

This will return `0`, the index of the matching object.

## indexOf

```javascript
const myArray = [5, 8, 3, 2];
myArray.indexOf(8);
```

Returns `1`. You can't pass a callback into this function so it's much less likely that you'd use this on an array of objects.

## findLast, findLastIndex, lastIndexOf

These methods start the search at the *end* of the array. So:

```javascript
const myArray = [{ name: 'Alex' }, { name: 'Sarah' }, { name: 'Alex' }];
myArray.findLastIndex(person => person.name === 'Alex');
```

will return `2` and not `0`, because `2` is where the *last* match appears. This is essentially equivalent to:

```javascript
const myArray = [{ name: 'Alex' }, { name: 'Sarah' }, { name: 'Alex' }];
[...myArray].reverse().findIndex(person => person.name === 'Alex');
```

[Back](./001-introduction.md)
