# React Hooks — useCallback

The easiest way to explain `useCallback` is this:

```javascript
const getContactById = useCallback((id) => (
  contacts.find(contact => contact.id === id)
), [contacts]);
```

is exactly the same as this:

```javascript
const getContactById = useMemo(() => (
  (id) => (
    contacts.find(contact => contact.id === id)
  )
), [contacts]);
```

In short, `useCallback` makes sure that a function you define is the same between renders as long as the dependencies don't change.

Why do we want to do this?

The first reason is the same as the last: avoiding re-renders of child components.

```javascript
function Contacts({ contacts }) {
  const [searchString, setSearchString] = useState('');
  const clearFilter = () => setSearchString('');

  return (
    <>
      <input
        type="text"
        value={searchString}
        onChange={({ target: { value }}) => setSearchString(value)}
      />
      <ContactsList filter={searchString}>
      <Sidebar clearFilter={clearFilter}>
    </>
  );
}
```

We've got the same problem as before: `clearFilter` is set to a new function each time the component renders. So now whenever the `searchString` changes, `Sidebar` is gonna be re-rendered, even though doesn't use `searchString` and is memoized!

But if we did this:

```javascript
const clearFilter = useCallback(() => setSearchString(''), []);
```

now `clearFilter` isn't ever going to change, so `ContactsList` won't be re-rendered when `searchString` changes.

Side note: Why doesn't `setSearchString` need to be in the dependency array? Because it's returned from `useState` and it won't ever change as long as the component is alive. The linter knows this and so it won't tell you it has to be in the array.

But it's not just about performance. Look at this example with `useEffect`:

```javascript
function ContactsPage() {
  const [contacts, setContacts] = useState([]);

  const loadContacts = () => Contacts.load().then(setContacts);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  return <ContactsList contacts={contacts} />;
}
```

Uh oh. `loadContacts` is a new function on each render. The `useEffect` will see that and call its callback on each render. Which calls `loadContacts`, which calls `setContacts`, which causes a re-render, which calls the `useEffect` callback, which...we're in trouble.

```javascript
const loadContacts = useCallback(() => Contacts.load().then(setContacts), []);
```

That's our solution!

Next: [useRef](./010-useref.md).
