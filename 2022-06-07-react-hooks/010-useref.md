# React Hooks — useRef

What do you do when you have values and references you want to remember across renders but you don't want them to trigger re-renders when they change? Try `useRef`! [Let's see it in action](./examples/010-01.jsx).

Why `timeoutId.current`? Why not just `timeoutId = whatever`?

Because while `timeoutId` is a new variable on each render, it holds a reference to an object with one property, `current`, and that reference can persist across renders.

If you reassigned `timeoutId`, you'd merely be reassigning that variable for that specific render and your value would be gone.

For example:

#### Render 1

`timeoutId = 0x0011`

| Address | Value             |
| ------- | ----------------- |
| 0x0012  | { current: null } |
| 0x0013  | 0x0012            |

### Render 2

`timeoutId = 0x00C5`

| Address | Value             |
| ------- | ----------------- |
| 0x0012  | { current: null } |
| 0x00C5  | 0x0012            |

So `timeoutId.current = 5` becomes

| Address | Value          |
| ------- | -------------- |
| 0x0012  | { current: 5 } |
| 0x00C5  | 0x0012         |

but `timeoutId = 5` becomes

| Address | Value             |
| ------- | ----------------- |
| 0x0012  | { current: null } |
| 0x00C5  | 5                 |

The most prominent usage of `useRef` is to get access to DOM nodes that are represented by the JSX in your component:

```javascript
function Button() {
  const ref = useRef();

  return (
    <button type="button" ref={ref}>Button</button>
  );
}
```

This is useful when you need to do something external to React, like getting scroll positions, dealing with external libraries, etc.

So `ref.current` will hold the `<button>` DOM element.

Next: [Other Hooks](./011-other-hooks.md).
