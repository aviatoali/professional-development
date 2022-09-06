import { useMemo, useState } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';

import { addContact, getContacts } from './api';

const BLANK_CONTACT = { name: '', company: '' };

const client = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={client}>
      <SmartComponent />
    </QueryClientProvider>
  );
}

function SmartComponent() {
  const [contact, setContact] = useState(BLANK_CONTACT);

  const { data: contacts } = useQuery('contacts', getContacts);

  const queryClient = useQueryClient();

  const { mutate } = useMutation(addContact, {
    onMutate(contact) {
      queryClient.setQueryData('contacts', (old) => [...old, contact]);
    },
    onSuccess(contact) {
      queryClient.setQueryData('contacts', (old) => [
        ...old.filter((c) => c.id),
        contact,
      ]);
    },
  });

  const sortedContacts = useMemo(
    () => contacts?.sort((a, b) => a.name.localeCompare(b.name)) ?? [],
    [contacts]
  );

  const submitForm = (e) => {
    e.preventDefault();
    mutate(contact);
    setContact(BLANK_CONTACT);
  };

  return (
    <>
      <ul>
        {sortedContacts.map((contact) => (
          <li key={contact.id || Math.random()}>
            {contact.name} ({contact.company}){' - '}
            {contact.id ? `#${contact.id}` : 'Saving...'}
          </li>
        ))}
      </ul>
      <form onSubmit={submitForm}>
        <input
          type="text"
          placeholder="Name"
          value={contact.name}
          required
          onChange={({ target: { value } }) =>
            setContact((c) => ({ ...c, name: value }))
          }
        />
        <input
          type="text"
          placeholder="Company"
          value={contact.company}
          required
          onChange={({ target: { value } }) =>
            setContact((c) => ({ ...c, company: value }))
          }
        />
        <button>Add Contact</button>
      </form>
    </>
  );
}
