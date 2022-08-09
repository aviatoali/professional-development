# React Query - Todos w/ React Query

## App.jsx

```javascript
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  );
}
```

## Todos.jsx

```javascript
function Todos() {
  const { data: todos } = useQuery('todos', getTodos);

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

[Back](./001-react-query.md)
