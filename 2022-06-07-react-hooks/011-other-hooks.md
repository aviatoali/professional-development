# React Hooks — Other Hooks

## useLayoutEffect

This is very similar to `useEffect` except that it allows you to make modifications before the component has had a chance to be painted on the screen. If you find yourself seeing flashes of undesired content when using `useEffect`, try `useLayoutEffect` instead.

## useImperativeHandle

`useImperativeHandle` is used in conjunction with `forwardRef` (which lets you forward refs from a parent into a child) and allows you to customize a ref so a parent can access functionality in a child component. This is almost always an anti-pattern and should be used sparingly.

Next: [Rules of Hooks](./012-rules-of-hooks.md).
