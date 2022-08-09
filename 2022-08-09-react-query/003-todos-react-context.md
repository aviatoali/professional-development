# React Query - Todos w/ React Context

## App.jsx

```javascript
const TodosContext = React.createContext([]);

function App() {
  const [todos, setTodos] = useState([]);

  return (
    <TodosContext.Provider value={[todos, setTodos]}>
      <Todos />
    </Todos>
  );
}
```

## Todos.jsx

```javascript
function Todos() {
  const [todos, setTodos] = useContext(TodosContext);

  useEffect(() => {
    if (!todos) {
      getTodos().then(setTodos);
    }
  }, [setTodos]);

  if (!todos) {
    return null;
  }

  return (
    <ul>
      {todos.map(todo => <li key={todo.id}>{todo.description}</li>)}
    </ul>
  );
}
```

## Cons

1. The only data you're handling here is todos! If you want to allow for more data, you'll have to expand your `useState` and make it even more complex.

2. Once you've done that, any changes to any of the data (even non-Todo data) will cause all components using this context to re-render!

3. You're losing out on all of the other features of React Query, like query invalidation, loading/fetching/error states, etc.

[Back](./001-react-query.md)
