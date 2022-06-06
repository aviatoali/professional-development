# React Hooks — useEffect

React class components had a complex series of lifecycle hooks, like `componentDidMount`, `componentWillUnmount`. `useEffect` replaces these with an entirely new concept: side effects (hence the `Effect` in `useEffect`).

The following things in a component may cause side effects:

1. Props changing
2. State changing
3. Mounting
4. Unmounting

By "props changing" and "state changing," we specifically mean when what is stored in the variable changes. So for strings, numbers, etc., when the string or number changes. For objects and arrays, the actual reference needs to change, not just the object or array being referenced.

In order to keep all of the side effects synced up to these events, we can use `useEffect`:

```javascript
useEffect(() => {
  document.title = `Editing Contact - ${contactName}`;
}, [contactName]);
```

`useEffect` side effects in sync with state and properties. The `[contactName]` bit here is called the "dependency array." It tells `useEffect` when to call the callback.

In code this would roughly look like this:

```javascript
let previousDependencies = null;

function useEffect(callback, dependencies) {
  if (!dependencies || dependencies.some((dep, index) => dep !== previousDependencies[index])) {
    callback();
  }

  previousDependencies = dependencies;
}
```

Additionally, you can use `useEffect` do cause side effects when mounting or unmounting the component:

```javascript
useEffect(() => {
  socket.connect();

  return () => socket.disconnect();
}, []);
```

Leaving the array empty means that it will only be called when the component mounts, and you can see why in the example code above. When `useEffect` is first called, the dependency array will be set to `[]`, and since it will never change, the callback will never be called again.

Returning a function (called a cleanup function) from a `useEffect` means that when the component unmounts, that function will be called. (I did not account for this in my example code above).

Note: The linter will yell at you if you use anything inside of the callback *that might change* that isn't in the dependency array. So

```javascript
const [name, setName] = useState('');
const [email, setEmail] = useState('');

useEffect(() => {
  Contact.update({ name, email });
}, [email]);
```

is going to cause the linter to get upset. `name` must be in the dependency array. The reason is because of JavaScript closures (essentially, if you leave `name` out, the callback may have a stale version of `name` when you call the callback). But the important thing to know is that the linter will help you.

However, if you're using something that *won't* change, like the `Contact` API which is defined *outside* of the component, you don't need it in there and the linter won't get mad. A `useState` setter function (like `setName` here) is also contstant, and the linter knows this, so this is allowed:

```javascript
useEffect(() => {
  setName(updatedName);
}, [updatedName]);
```

However, beware of doing something like this:

```javascript
useEffect(() => {
  setContact({
    ...contact,
    name
  });
}, [name]);
```

The linter _will_ be upset because `contact` can change. But if we add `contact` to the dependency array:

```javascript
useEffect(() => {
  setContact({
    ...contact,
    name
  });
}, [name, contact]);
```

Now we're in infinite loop territory. The `useEffect` callback gets called when `contact` changes, but it also changes `contact`. So we need to use the `useState` setter callback:

```javascript
useEffect(() => {
  setContact(previousContact => ({
    ...previousContact,
    name
  }));
}, [name]);
```

which lets us avoid having `contact` in the dependency array.

Note: Why this?

```javascript
setContact({
  ...contact,
  name
});
```

instead of this?

```javascript
contact.name = name;
setContact(contact);
```

React re-renders when the state changes. But unless you create a new array or object (using array functions, or the spread operator `...`, or `Object.assign`), then the state variable's reference doesn't change, and the component doesn't know to re-render!

Let's take a look at [an example](./examples/005-001.jsx) with a bug in it so we can see how this works.

Next: [useContext](./006-usecontext.md).
