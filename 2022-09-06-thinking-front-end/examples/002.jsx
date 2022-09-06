import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { useAddContact, useSortedContacts } from './hooks';

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
  return (
    <>
      <ContactListSmart />
      <ContactFormSmart />
    </>
  );
}

function ContactListSmart() {
  const sortedContacts = useSortedContacts();
  return <ContactList contacts={sortedContacts} />;
}

function ContactList({ contacts }) {
  return (
    <ul>
      {contacts.map((contact) => (
        <Contact key={contact.id || Math.random()} contact={contact} />
      ))}
    </ul>
  );
}

function Contact({ contact }) {
  return (
    <li>
      {contact.name} ({contact.company}){' - '}
      {contact.id ? `#${contact.id}` : 'Saving...'}
    </li>
  );
}

function ContactFormSmart() {
  const addContact = useAddContact();
  return <ContactForm onSubmit={addContact} />;
}

function ContactForm({ onSubmit }) {
  const [contact, setContact] = useState(BLANK_CONTACT);

  const submitForm = (e) => {
    e.preventDefault();
    onSubmit(contact);
    setContact(BLANK_CONTACT);
  };

  const handleChange = (property) => {
    return ({ target: { value } }) =>
      setContact((c) => ({ ...c, [property]: value }));
  };

  return (
    <form onSubmit={submitForm}>
      <input
        type="text"
        placeholder="Name"
        value={contact.name}
        required
        onChange={handleChange('name')}
      />
      <input
        type="text"
        placeholder="Company"
        value={contact.company}
        required
        onChange={handleChange('company')}
      />
      <button>Add Contact</button>
    </form>
  );
}
