# React Query - Todos w/ React Redux + React Sagas

## actionTypes.js

```javascript
const LOAD_TODOS = 'LOAD_TODOS';
const LOAD_TODOS_SUCCESS = 'LOAD_TODOS_SUCCESS';
const LOAD_TODOS_FAILURE = 'LOAD_TODOS_FAILURE';
```

## actions.js

```javascript
function loadTodos() {
  return {
    type: LOAD_TODOS
  }
}

function loadTodosSuccess(todos) {
  return {
    type: LOAD_TODOS_SUCCESS,
    payload: todos
  }
}

function loadTodosFailure() {
  return {
    type: LOAD_TODOS_FAILURE
  }
}
```

## todos.js

```javascript
import {
  LOAD_TODOS,
  LOAD_TODOS_SUCCESS,
  LOAD_TODOS_FAILURE
} from "../actionTypes";

const initialState = {
  todos: [],
  loading: false,
  error: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_TODOS:
      return { ...state, loading: true };
    case LOAD_TODOS_SUCCESS:
      return { ...state, todos: action.payload, loading: false, error: false };
    case LOAD_TODOS_FAILURE:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
}
```

## rootReducer.js

```javascript
export default combineReducers({ todos });
```

## sagas.js

```javascript
function* loadingTodos() {
  try {
    const todos = yield call(getTodos);
    yield put(loadTodosSuccess(todos));
  } catch (e) {
    yield put(loadTodosFailure());
  }
}

export default function* () {
  yield takeLatest(LOAD_TODOS, loadingTodos);
}
```

## store.js

```javascript
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { saga } from './sagas'

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(saga);

export default store;
```

## App.jsx

```jsx
function App() {
  return (
    <Provider store={store}>
      <Todos />
    </Provider>
  )
}
```

## Todos.jsx

```jsx
function Todos() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.todos);

  useEffect(() => {
    if (!todos) {
      dispatch({ type: LOAD_TODOS });
    }
  }, []);

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

Holy boilerplate, Batman!

[Back](./001-react-query.md)
