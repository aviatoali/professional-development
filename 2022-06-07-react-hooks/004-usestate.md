# React Hooks — useState

```javascript
const [name, setName] = useState('');
```

The simplest hook. `name` is initialized to the default that's passed into `useState()`. `setName` updates the `name` value and causes the component to re-render.

Note that you can pass a function into `useState` and the value will be initialized to whatever is returned from that function. So:

```javascript
const [name, setName] = useState(() => getFullName(user));
```

The reason we want to do this instead of

```javascript
const [name, setName] = useState(getFullName(user));
```

is that each time the component is rendered, `getFullName(user)` would get called, but the value would not be used, because `name` has already been initialized.

The `useState` setters also take a callback function so you can use the current value of the state:

```javascript
setCounter(previousCounter => previousCounter + 1);
```

One reason why this is useful is this:

```javascript
const incrementTwice = () => {
  setCounter(counter + 1);
  setCounter(counter + 1);
};
```

If `counter` started at `0`, this function will increment it not to `2`, but to `1`. That's because the component hasn't had a chance to re-render yet when the second one is called, so it's using the component's current `0` value twice.

But this:

```javascript
const incrementTwice = () => {
  setCounter(previousCounter => previousCounter + 1);
  setCounter(previousCounter => previousCounter + 1);
};
```

will work, as it gives you the actual state value.

Another reason why this is useful will be explained later.

Next: [useEffect](./005-useeffect.md).
