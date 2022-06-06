# React Hooks — useReducer

Basically an advanced `useState`, `useReducer` allows you to manage a large chunk of data easily in a single component:

```javascript
const initialState = { counter: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, counter: state.counter + 1 };
    case 'decrement':
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      {state.counter}
      <button type="button" onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button type="button" onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  )
}
```

Your state object can be as big as you want, and you can encapsulate data changes inside of the reducer. You can also add whatever payload you want to the action, like this:

```javascript
dispatch({
  type: 'increment',
  amount: 5
})
```

and then use `action.amount` in the reducer to determine how much to increment by:

```javascript
return {
  ...state,
  counter: state.counter + action.amount
};
```

Next: [useMemo](./008-usememo.md).
