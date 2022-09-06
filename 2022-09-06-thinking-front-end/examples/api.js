const CONTACTS = [
  { id: 1, name: 'Alex Morrise', company: 'ActiveCampaign' },
  { id: 2, name: 'Sarah Morrise', company: 'Peoria Unified School District' },
  {
    id: 3,
    name: 'Natalie Morrise',
    company: 'Desert Harbor Elementary Pre-School',
  },
];

export const getContacts = () => CONTACTS;

export const addContact = (contact) => {
  const newContact = { ...contact, id: getContacts().length + 1 };

  return new Promise((resolve) => {
    setTimeout(() => {
      CONTACTS.push(newContact);
      resolve(newContact);
    }, 2500);
  });
};
