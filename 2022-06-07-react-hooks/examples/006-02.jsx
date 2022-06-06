import { createContext, useContext, useState } from 'react';

const Theme = {
  Dark: {
    name: 'dark',
    color: 'black',
  },
  Light: {
    name: 'light',
    color: 'blue',
  },
};

const ThemeContext = createContext(Theme.Dark);

const useDays = () => [
  { id: 1, label: '1' },
  { id: 2, label: '2' },
  { id: 3, label: '3' },
];

export function App() {
  const [theme, setTheme] = useState(Theme.Dark);

  return (
    <ThemeContext.Provider value={theme}>
      <Calendar />
      <button
        type="button"
        onClick={() =>
          setTheme(theme.name === 'light' ? Theme.Dark : Theme.Light)
        }
      >
        Toggle theme
      </button>
    </ThemeContext.Provider>
  );
}

function Calendar() {
  const days = useDays();

  return (
    <div>
      {days.map((day) => (
        <Day key={day.id} day={day} />
      ))}
    </div>
  );
}

function Day({ day }) {
  const theme = useContext(ThemeContext);

  return <div style={{ color: theme.color }}>{day.label}</div>;
}
