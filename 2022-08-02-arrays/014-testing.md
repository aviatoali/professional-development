# All About Arrays - Testing

## Testing?

"Testing" here doesn't mean, like, unit testing. It means "testing that an array has some quality."

## Includes

For example, you can test that an array includes a specific value.

```javascript
const myArray = [1, 2, 3];
const hasTwo = myArray.includes(2);
```

Note that this function does *not* take a callback.

## Some

Test that some of the values in your array meet certain criteria.

```javascript
const myArray = [{ name: 'Alex' }, { name: 'Sarah' }, { name: 'Molly' }];
const hasAnyNamesStartingWithS = myArray.some(people => people.name[0] === 'S');
```

as long as *some* of the values start with S, this will return true.

This function could also theoretically be called "any," because once *any* of these returns true, the iteration will stop and it will return true.

So it essentially works like this:

```javascript
function mySome(array, callback) {
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i])) {
      return true;
    }
  }

  return false;
}
```

## Every

Test that every item in an array matches certain criteria.

```javascript
const myArray = [{ name: 'Alex' }, { name: 'Sarah' }, { name: 'Molly' }];
const allNamesStartWithS = myArray.every(people => people.name[0] === 'S');
```

This short-circuits similarly to how `some` does, but in reverse. Once one of the items returns falsy, it short circuits and stops iterating and simply returns false.

[Back](./001-introduction.md)
