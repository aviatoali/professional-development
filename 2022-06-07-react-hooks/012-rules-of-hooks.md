# React Hooks — Rules of Hooks

The "Rules of Hooks" are rules that React (and the linter) will use to make sure you're using React Hooks correctly. The first two of these are the official Rules of Hooks™ and the other two are ones I've added to help clarify things.

1. Hooks should only be called top-level. So, not in a loop or a conditional, or after an early return. [Why?](./examples/012-01.jsx) As you can see, the return values of the hooks are all stored in an array. They're expected to be called in a specific order, and if they're called out of order, things will break.

2. Hooks should only be called from a) React components, or b) other hooks (which can only be called from React components). This is because...why would you need them elsewhere?

3. Hooks should start with `use`. This is simply so the linter knows the function is a hook and can enforce the Rules of Hooks.

4. All components rendered in a React application (i.e. the root and everything underneath it) must use the *same instance of React*. What does that mean?

Next: [Custom Hooks](./013-custom-hooks.md).
