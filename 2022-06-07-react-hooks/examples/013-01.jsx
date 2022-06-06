import { useState } from 'react';

function useCounter(initialValue) {
  const [counter, setCounter] = useState(initialValue);
  const increment = () => setCounter((c) => c + 1);
  const decrement = () => setCounter((c) => c - 1);

  return {
    counter,
    increment,
    decrement,
  };
}

export function Counter() {
  const { counter, increment, decrement } = useCounter(0);

  return (
    <>
      <div>{counter}</div>
      <button type="button" onClick={increment}>
        +
      </button>
      <button type="button" onClick={decrement}>
        -
      </button>
    </>
  );
}
