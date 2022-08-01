# All About Arrays - The Spread Operator

The spread operator (`...`), also known as "spread syntax," is something that was brought into JavaScript in ES6. It is used in a couple different ways.

## Spreading an array into a function call

```javascript
const minimum = Math.min(1, 2, 3);
```

This can be accomplished with the spread operator:

```javascript
const values = [1, 2, 3];
const minimum = Math.min(...values);
```

## Spreading an array into another array

```javascript
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const array3 = [...array1, ...array2, 7, 8, 9];
```

This results in the following array:

```javascript
[1, 2, 3, 4, 5, 6, 7, 8, 9]
```

Be sure you are using the spread operator. If you forget to use it, you'll end up with unexpected results:

```javascript
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const array3 = [...array1, array2, 7, 8, 9];
```

See how we forgot the `...` before `array2`? This results in `array3` looking like this:

```javascript
[1, 2, 3, [4, 5, 6], 7, 8, 9]
```

## Spreading a string into an array

```javascript
const hello = 'hello!';
const letters = [...hello];
```

This gives us the following result:

```javascript
['h', 'e', 'l', 'l', 'o', '!']
```

## Spreading a generator function

The reason a string can be spread is because it is iterable (just like arrays are). In JavaScript, iterable specifically means that you can create an Iterator for it. An Iterator essentially works like this:

```javascript
const iterator = [1, 2, 3][Symbol.iterator](); // don't worry too much about this
let value;
while (value = iterator.next()) {
  console.log(value); // this will log 1, then 2, then 3, then the loop will end
}
```

Here you can see that an iterator is an object that has a `.next()` function on it, which will return each value in sequence, one after another. Strings are iterable:

```javascript
const iterator = 'hello!'[Symbol.iterator]();
```

And generators can be used in the same way:

```javascript
function* generateItems() {
  for (let i = 0; i < 10; i++) {
    yield i;
  }
}
```

You can spread the results of this function into an array:

```javascript
[...generateItems()];
```

## Not to be confused with the rest operator

The rest operator looks just like the spread operator (`...`) but is used in a different way:

```javascript
function printNames(label, ...names) {
  for (let i = 0; i < names.length; i++) {
    console.log(label, names[i]);
  }
}

printNames('Student Name:', 'Lindsey', 'Scotty', 'Guse');
```

This "collects" the rest of the arguments (hence "rest operator") into an array.

[Back](./001-introduction.md)
