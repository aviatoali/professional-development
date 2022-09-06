import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addContact, getContacts } from './api';

const useContacts = () => {
  const { data: contacts } = useQuery('contacts', getContacts);
  return contacts;
};

export const useSortedContacts = () => {
  const contacts = useContacts();

  return useMemo(
    () => contacts?.sort((a, b) => a.name.localeCompare(b.name)) ?? [],
    [contacts]
  );
};

export const useAddContact = () => {
  const queryClient = useQueryClient();

  return useMutation(addContact, {
    onMutate(contact) {
      queryClient.setQueryData('contacts', (old) => [...old, contact]);
    },
    onSuccess(contact) {
      console.log(contact);
      queryClient.setQueryData('contacts', (old) => [
        ...old.filter((c) => c.id),
        contact,
      ]);
    },
  }).mutate;
};
