# React Hooks — Custom Hooks

So, based on the Rules of Hooks, a custom hook is simply a function you define that:

1. Starts with `use`
2. Uses at least one hook

So this would be a custom hook:

```javascript
function useCounter(initialValue) {
  const [counter, setCounter] = useState(initialValue);
  const increment = () => setCounter(c => c + 1);
  const decrement = () => setCounter(c => c - 1);

  return {
    counter,
    increment,
    decrement
  };
}
```

because it starts with `use` and uses another hook. It must start with `use` so the Rules of Hooks can be enforced. If you have a function that doesn't start with `use` and it uses hooks, the linter will complain.

If you have a function that starts with `use` but it doesn't use any hooks, it probably doesn't need to be a hook and should be renamed and located in a utilities folder so it can be used outside of the component context if needed.

[Let's see our hook in action](./examples/013-01.jsx)!

Next: [Conclusion](./014-conclusion.md).
