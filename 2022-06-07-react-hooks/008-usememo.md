# React Hooks — useMemo

`useMemo` allows you to memoize stuff in your component, which will help you avoid repeating expensive computations and triggering re-renders and extraneous `useEffect` calls.

[Consider this example.](./examples/008-01.jsx)

Everything in the `Contacts` function will be called whenever any state changes (like when the modal is shown/hidden). So even though `contacts` didn't change, the `contacts.filter` has to be called again. And not only is the expensive filter computation is run on each render, but `MemoizedContactList` is re-rendered on each render!

But why? I memoized my component so this wouldn't happen!

Well, the `filter` function creates a *new* array. Which means that each render, `visibleContacts` will be a brand new array. `React.memo` (and in fact React hook dependency arrays and even all memoization functions by default) do a shallow comparison for its parameters/properties, meaning that it won't check if all of the values *in* the array are the same, it will only check if the arrays themselves are the same. And this new array isn't the same one passed in last time.

So, how do we make sure it *is* the same?

Enter `useMemo`. [Check out the difference here](./examples/008-02.jsx).

The first parameter is the function to be called to calculate what the memoized value will be. The second is a dependency array that functions the same as the one in `useEffect`, i.e. it'll do a shallow comparison on each render, and if the array items are the same, it won't recalculate.

Next: [useCallback](./009-usecallback.md).
