import { memo, useState } from 'react';

export function Contacts({ contacts }) {
  const visibleContacts = contacts.filter((contact) => contact.isVisible);
  const [showCreationModal, setShowCreationModal] = useState(false);

  return (
    <>
      <Header />
      <MemoizedContactsList contacts={visibleContacts} />
      {showCreationModal && (
        <ContactCreationModal onClose={() => setShowCreationModal(false)} />
      )}
      <button type="button" onClick={() => setShowCreationModal(true)}>
        Add Contact
      </button>
    </>
  );
}

function ContactsList({ contacts }) {
  console.log('Re-rendering ContactsList');

  return (
    <ul>
      {contacts.map((contact) => (
        <Contact key={contact.id} contact={contact} />
      ))}
    </ul>
  );
}
const MemoizedContactsList = memo(ContactsList);

function Contact({ contact }) {
  return <div>{contact.name}</div>;
}

function ContactCreationModal({ onClose }) {
  return (
    <div>
      Modal
      <button type="button" onClick={onClose}>
        Close
      </button>
    </div>
  );
}

function Header() {
  return <div>Header</div>;
}
