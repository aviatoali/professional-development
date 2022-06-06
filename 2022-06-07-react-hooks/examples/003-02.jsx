import { memo, useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Count count={count} />
      <button type="button" onClick={() => setCount(count + 1)}>
        +
      </button>
      <MemoizedCalendar />
    </div>
  );
}

function Calendar() {
  console.log('Re-rendering calendar...');
  return <div>{/* Render an expensive calendar */}</div>;
}

function Count({ count }) {
  return <div>Count: {count}</div>;
}

const MemoizedCalendar = memo(Calendar);
