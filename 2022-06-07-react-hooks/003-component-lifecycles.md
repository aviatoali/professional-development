# React Hooks — Component Lifecycles

## When does a component re-render?

It's important to understand this before we dive in. Components re-render under these circumstances:

1. There is a change in props
2. There is a change in state
3. The parent component re-renders (and the component is not memoized)

"Re-render" essentially means that the component function is called again, and the rendered component is replaced with whatever is returned this time.

## How can a component be memoized?

`React.memo` exists for this purpose. Consider [this example](./examples/003-01.jsx).

Every time the `count` value changes, the `Counter` component will re-render. This will cause all of the child components to re-render as well, which means calling each of the function components. In the case of `Count`, we *want* that to re-render, because the count has changed.

But `Calendar` is not dependent on any of the properties in the parent, and yet it too will re-render. `Calendar` is a very expensive component to re-render and we don't want it to recompute everything just because some unrelated counter changed!

So [let's memoize it](./examples/003-02.jsx).

```javascript
const MemoizedCalendar = React.memo(Calendar);
```

That's it! Now if we use `MemoizedCalendar` in place of `Calendar`, it won't re-render unless its own state changes, because it will check if the properties passed into it are the same from last time it was called (i.e. last time it was rendered) and if so, it will just return whatever it returned last time. Yay!

## When is a component mounted and unmounted?

A component is "mounted" (i.e. a new instance of the component is created) in the following cases:

1. When it is first `return`ed by another React component (or `render`ed by React DOM if it is the top-level component)

```javascript
return (
  <div>
    {showButton && <button />}
  </div>
)
```

When `showButton` goes from `true` to `false` to `true`, it will unmount and re-mount, meaning all state is reset.

2. When its `key` changes

```javascript
{items.map(item => <Item key={item} />)}
```

When this `key` changes, the instance will be destroyed and created fresh.

Lists in React require `key` properties so it knows which instance is which, even if the order of the items changes, so it doesn't *need* to destroy and re-create the elements.

`key` can also be used outside of a list:

```javascript
<Contact key={contact.id}>
```

If the `contact.id` changes, the entire component will be unmounted and re-mounted. Useful if you want to reset state.

Now with that in mind...

Next: [useState](./004-usestate.md).