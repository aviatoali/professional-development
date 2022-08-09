# React Query

## What is it?

React Query is a package used for global/shared state management in React applications.

## How do you use it?

There are four basic parts to using React Query.

### QueryClient

```javascript
const queryClient = new QueryClient();
```

The `QueryClient` is a class that handles the data storage and subscribing to changes in the data.

You can pass in options when you create it, like telling it to cache the data for a specific amount of time.

It also exposes some functions and properties that you can use to retrieve or manipulate the data or get the state of data fetching, like `queryClient.getQueryCache()`, `queryClient.invalidateQueries()`, `queryClient.isFetching`, etc.

### QueryClientProvider

```jsx
<QueryClientProvider client={queryClient}>
  {children}
</QueryClientProvider>
```

This provides the `QueryClient` you've created to all of the child components. How does this work? It's just a React Context!

```jsx
<Context.Provider value={client}>{children}</Context.Provider>
```

This isn't just an example, it's literally copied from the `react-query` code!

### useQueryClient

```jsx
export const useQueryClient = () => {
  return useContext(Context);
}
```

This is a simplified version of what's in the React Query code. It's just getting the `QueryClient`. No wizardry here!

### useQuery

This is the real meat and potatoes of React Query.

#### How do you use it?

```javascript
const result = useQuery(queryKey, queryFn, options);
```

And `result` looks like this:

```javascript
{
  data,
  dataUpdatedAt,
  error,
  errorUpdatedAt,
  failureCount,
  isError,
  isFetched,
  isFetchedAfterMount,
  isFetching,
  isPaused,
  isLoading,
  isLoadingError,
  isPlaceholderData,
  isPreviousData,
  isRefetchError,
  isRefetching,
  isStale,
  isSuccess,
  refetch,
  remove,
  status,
  fetchStatus,
}
```

These properties will update depending on the data lifecycle.

#### How does it work?

Well, internally it creates an Observer (uses the Observer pattern), kicks off a request for the data, and fires an event to tell the hook that the data has changed. When the data changes, it tells the component to rerender.

In version 3 of React Query, it literally did this:

```javascript
const [, forceUpdate] = useState(0);

...

// When data updates
forceUpdate(x => x + 1);
```

But now in version 4 it uses `useSyncExternalStore` which is a hook used specifically for this purpose.

## Comparisons

Let's pretend we have a function that will load Todos from the API:

```javascript
const getTodos = () => fetch('/todos').then(response => response.json());
```

How would you load and render a list of todos using this API?

1. [React Query](./002-todos-react-query.md)
2. [React Context](./003-todos-react-context.md)
3. [React Redux](./004-todos-react-redux.md)
