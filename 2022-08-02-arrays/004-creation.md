# All About Arrays - Creation

## Creating an empty array

```javascript
const myArray = [];
const myOtherArray = new Array();
```

The latter is not generally necessary, as the former is shorthand for the latter.

A note about `const`: You almost *always* want to declare your array as `const`. This will stop you from doing something like this:

```javascript
const myArray = [1, 2, 3];
myArray = [];
```

which creates a completely new array, i.e. points the name `myArray` do a different array, which is confusing!

## Creating an array of a specific length

```javascript
const myArray = new Array(3);
const myOtherArray = Array(3);
```

When would you want to do this? Well, not very frequently. In some programming languages where memory management is handled by the programmer, array length *must* be specified, and attempting to access a value beyond the end of the array will give you unexpected results (i.e. whatever happens to be stored there in memory).

But you may find yourself wanting to do something a certain number of times, like creating test data, or looping over the days of the week. However, you must be careful when using `new Array(3)` or `Array(3)`. This is because in JavaScript, you can actually have an array with empty indexes. Not `undefined`, but actually empty. There are other times you might run into empty indexes:

```javascript
const myArray = [1, 2, , 4];
const myOtherArray = [1, 2];
myOtherArray[3] = 4;
```

Both of these will look like this if you look at them in the console:

```javascript
[1, 2, empty, 4];
```

Which is fine, but if you looped over these:

```javascript
myArray.forEach(() => console.log('hello'));
```

You'd only get 3 `hello`s, and not 4. So if you were trying to render a week in React and you did this:

```javascript
Array(7).map(() => <Day />);
```

it actually wouldn't render *anything* because all of the indexes are empty:

```javascript
[empty, empty, empty, empty, empty, empty, empty]
```

 So you have to fill the array with some value, even `undefined` or `null`:

```javascript
Array(7).fill(undefined).map(() => <Day />);
Array(7).fill().map(() => <Day />); // this works too
```

and now it will work because the array became:

```javascript
[undefined, undefined, undefined, undefined, undefined, undefined, undefined]
```

## Creating an array with a predetermined list of values

```javascript
const myArray = [1, 2, 3];
const myOtherArray = new Array(1, 2, 3);
```

Beware using this second one with the spread operator, or it might try to create an array of a specific length:

```javascript
const values = [1];
const myArray = new Array(...values);
```

You might expect this result:

```javascript
[1]
```

but you'll actually get:

```javascript
[empty]
```

That's because what we did there is equivalent to:

```javascript
const myArray = new Array(1);
```

## Creating an array from a string

Using the spread operator magic:

```javascript
const letters = [...'Hello, world!'];
```

gives us

```javascript
['H', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd', '!']
```

## Copying an array

There are a number of ways to make a shallow copy of an array (i.e. any arrays or objects in the array will be copied by reference). We'll go over some of these array methods below later and you'll see why they work.

```javascript
const myArray = [1, 2, 3];
const myArrayCopy1 = [...myArray];
const myArrayCopy2 = Array.from(myArray);
const myArrayCopy3 = myArray.map(i => i);
const myArrayCopy4 = myArray.slice();
const myArrayCopy5 = myArray.filter(i => true);
const myArrayCopy6 = myArray.concat();
const myArrayCopy7 = [];

for (let i = 0; i < myArray.length; i++) {
  myArrayCopy7[i] = myArray[i];
}
```

As you can see, there are *lots* of ways to copy an array! The method you choose to use is up to you, but make sure that semantically it makes sense! If you're looking for the "right" way to copy, using the spread operator is the one you'll probably see the most in documentation.

## Deep copying an array

There are multiple methods to deep copying an array:

```javascript
const myArray = [{ name: 'Alex' }, { name: 'Sarah' }];
const myArrayCopy1 = structuredClone(myArray);
const myArrayCopy2 = JSON.parse(JSON.stringify(myArray));
const myArrayCopy3 = _.cloneDeep(myArray);
```

`structuredClone` is the "official" way to deep clone an array or object, and it has pretty good browser support.

Stringifying the array into JSON and then parsing it will work sometimes but not all the time.

`_.cloneDeep` is a `lodash` function. Lots of libraries include deep cloning functions.

[Back](./001-introduction.md)
