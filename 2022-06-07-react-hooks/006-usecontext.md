# React Hooks — useContext

React sometimes suffers from something called "prop drilling." Here's [an example](./examples/006-01.jsx).

We had to pass `theme` through `Calendar` even though it didn't care at all what the value was! Lame!

We can use a `Context` to...set a context for the application. [Check it out](./examples/006-02.jsx)!

Sweet! Look how much simpler that is! `useContext` gave us whatever was passed into `value` in the `ThemeContext.Provider` without having to pass it down through the component tree.

You can pass whatever you want in there, including an object:

```javascript
<MyContext.Provider value={{ contacts, deals }}>
```

```javascript
const { contacts } = useContext(MyContext);
```

*However*, be careful with this. When the context value changes, any components using `useContext` with that context will re-render. So even if your component doesn't care about the `deals` property, it will still re-render when `deals` changes.

That's why `Context` works best for something like a theme, where we *want* everything to re-render when the value changes. For more complex global state, we can use `react-query`, `zustand`, or `redux`, which do not cause re-renders for all global state changes.

Next: [useReducer](./007-usereducer.md).
