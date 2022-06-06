import { useEffect, useState } from 'react';

export function Contact() {
  const [contact, setContact] = useState({ name: 'Bob' });
  const [name, setName] = useState(contact.name);

  console.log('re-rendering!');

  useEffect(() => {
    console.log('in useEffect');

    setContact({
      ...contact,
      name,
    });
  }, [name]);

  return (
    <>
      <div>{contact.name}</div>
      <button type="button" onClick={() => setName(Math.random())}>
        Hello
      </button>
    </>
  );
}
