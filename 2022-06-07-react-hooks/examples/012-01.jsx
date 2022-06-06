import { useForceUpdate } from './utils/useForceUpdate';

const states = [];

let counter = 0;

const resetCounter = () => (counter = 0);

function myUseState(defaultValue) {
  const localCounter = counter++;

  return (states[localCounter] = states[localCounter] ?? [
    defaultValue,
    (newValue) => {
      states[localCounter][0] = newValue;
    },
  ]);
}

function App() {
  const [name, setName] = myUseState('');

  const [email, setEmail] = name ? myUseState('') : [];

  const [value, setValue] = myUseState('Hello');

  const forceUpdate = useForceUpdate(); // Automatic with real myUseState

  return (
    <div className="App">
      <div>
        <input
          type="text"
          value={name}
          onChange={({ target: { value } }) => {
            setName(value);
            forceUpdate();
          }}
        />
        {name && (
          <input
            type="email"
            value={email}
            onChange={({ target: { value } }) => {
              setEmail(value);
              forceUpdate();
            }}
          />
        )}
      </div>
      <div>{name}</div>
      <div>{value}</div>
      <button
        type="button"
        onClick={() => {
          setValue(Math.floor(Math.random() * 1000));
          forceUpdate();
        }}
      >
        Randomize!
      </button>
    </div>
  );
}

export default function Application(...args) {
  resetCounter(); // Happens automatically in React
  return App(...args);
}
