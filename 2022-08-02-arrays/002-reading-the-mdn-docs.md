# All About Arrays - Reading the MDN Docs

The best JavaScript Array documentation is the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

You can see the documentation for each Array function on the left. You'll notice that some of them say `Array.something` while others say `Array.prototype.something`.

Without getting too into the weeds, `Array` is a global object that is available in all execution contexts. It's essentially a global class but the way JavaScript works, the class itself is like a global variable that can have its own properties. So:

```javascript
Array.from('hello');
```

will call the `.from()` method on the global Array object.

Meanwhile, `Array.prototype.something` means that this function exists on an Array instance. That is, if I create a new Array:

```javascript
const myArray = []; // or
const myArray = new Array();

myArray.pop();
```

Then `myArray.pop` is going to perform some operation on my array. `Array.pop()` does not exist and will throw an error if you try to call it.

[Back](./001-introduction.md)
