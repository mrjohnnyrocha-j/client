// ContactsPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import AddContactForm from '@/Contacts/AddContactForm/AddContactForm';
import LoadingIndicator from '@/General/LoadingIndicator/LoadingIndicator';
import Header from '@/Contacts/Header/Header';
import ContactList from '@/Contacts/ContactList/ContactList';
import { fetchData, postData } from '../utils/apiClient';
import styles from '../styles/contacts/contacts.module.css';
import axios from 'axios';

interface Contact {
  id: string;
  userId: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
  profilePic?: string;
}

const ContactsPage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const userId = session?.user?.id;

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAddContactFormVisible, setAddContactFormVisible] = useState<boolean>(false);
  const [isEditContactFormVisible, setEditContactFormVisible] = useState<boolean>(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchContacts = useCallback(async () => {
    if (!userId) return;
    try {
      const contactsData = await fetchData<Contact[]>('/contacts', { params: { userId } });
      setContacts(Array.isArray(contactsData) ? contactsData : []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setContacts([]);
    }
  }, [userId]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchContacts();
      setLoading(false);
    })();
  }, [fetchContacts]);

  const handleAddContactClick = () => {
    setAddContactFormVisible(true);
  };

  const handleCloseForm = () => {
    setAddContactFormVisible(false);
    setEditContactFormVisible(false);
  };

  const handleSaveContact = async (contact: Contact) => {
    try {
      await postData('/contacts', { ...contact, userId });
      fetchContacts();
      handleCloseForm();
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };

  const handleEditContact = (contact: Contact) => {
    setSelectedContact(contact);
    setEditContactFormVisible(true);
  };

  const handleShowContactInfo = (contact: Contact) => {
    setSelectedContact(contact);
    alert(`Contact Info: \nName: ${contact.name}\nPhone: ${contact.phone}\nEmail: ${contact.email}\nAddress: ${contact.address}\nNotes: ${contact.notes}`);
  };

  const handleDeleteContact = async (contact: Contact) => {
    try {
      await axios.delete(`/api/contacts/${contact.id}`);
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  if (!session) {
    return <div>Please sign in to view your contacts.</div>;
  }

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div className={styles.contactsContainer}>
      <Header onSearch={() => {}} />
      <ContactList
        contacts={contacts}
        onAddContact={handleAddContactClick}
        onCall={(contact) => console.log('Call', contact)}
        onChat={(contact) => console.log('Chat', contact)}
        onEdit={handleEditContact}
        onShowInfo={handleShowContactInfo}
        onSendEmail={(contact) => console.log('Send Email', contact)}
        onSendMoney={(contact) => console.log('Send Money', contact)}
        onDelete={handleDeleteContact}
      />
      {isAddContactFormVisible && (
        <AddContactForm
          onClose={handleCloseForm}
          onSave={handleSaveContact}
          onCall={() => {}}
          onChat={() => {}}
          onSendMoney={() => {}}
        />
      )}
      {isEditContactFormVisible && selectedContact && (
        <AddContactForm
          onClose={handleCloseForm}
          onSave={handleSaveContact}
          contact={selectedContact}
          onCall={() => {}}
          onChat={() => {}}
          onSendMoney={() => {}}
        />
      )}
    </div>
  );
};

export default ContactsPage;
