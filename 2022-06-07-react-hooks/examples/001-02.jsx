import { useEffect, useState } from 'react';

export function Counter({ max }) {
  const [counter, setCounter] = useState(0);

  const increment = () => setCounter(Math.min(counter + 1, max));

  useEffect(() => {
    console.log('incremented!');
  }, [counter]);

  return (
    <div>
      {counter}
      <button type="button" onClick={increment}>
        +
      </button>
    </div>
  );
}
