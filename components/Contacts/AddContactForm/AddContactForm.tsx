// AddContactForm.tsx
import React, { useState, useEffect } from 'react';
import { fetchData, postData } from '../../../utils/apiClient';
import { FaArrowLeft, FaArrowRight, FaPhone, FaComments, FaDollarSign } from 'react-icons/fa';
import styles from './AddContactForm.module.css';

interface AddContactFormProps {
  onClose: () => void;
  onSave: (contact: any) => Promise<void>;
  contact?: any; // Optional contact for editing
  onCall: (contact: any) => void;
  onChat: (contact: any) => void;
  onSendMoney: (contact: any) => void;
}

const AddContactForm: React.FC<AddContactFormProps> = ({ onClose, onSave, contact, onCall, onChat, onSendMoney }) => {
  const [contactData, setContactData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
  });
  const [existingUsers, setExistingUsers] = useState<any[]>([]);
  const [selectedUserIndex, setSelectedUserIndex] = useState<number>(0);
  const [filter, setFilter] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (contact) {
      setContactData(contact);
    }
  }, [contact]);

  useEffect(() => {
    const fetchExistingUsers = async () => {
      try {
        const users = await fetchData('/users', { params: { filter, limit: 10, offset: page * 10 } });
        // setExistingUsers(users);
        // if (users.length > 0) {
        //   setSelectedUserIndex(0);
        //   fillContactData(users[0]);
        // }
      } catch (error) {
        console.error('Error fetching existing users:', error);
        setError('Error fetching existing users');
      }
    };

    fetchExistingUsers();
  }, [filter, page]);

  const fillContactData = (user: any) => {
    if (user) {
      setContactData({
        name: `${user.firstName || ''} ${user.lastName || ''}`,
        phone: user.phone || '',
        email: user.email || '',
        address: user.address || '',
        notes: user.notes || '',
      });
    }
  };

  const handlePrevUser = () => {
    const newIndex = selectedUserIndex === 0 ? existingUsers.length - 1 : selectedUserIndex - 1;
    setSelectedUserIndex(newIndex);
    fillContactData(existingUsers[newIndex]);
  };

  const handleNextUser = () => {
    const newIndex = selectedUserIndex === existingUsers.length - 1 ? 0 : selectedUserIndex + 1;
    setSelectedUserIndex(newIndex);
    fillContactData(existingUsers[newIndex]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await onSave(contactData);
      onClose();
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error saving contact';
      setError(errorMessage);
      console.error(errorMessage, error);
    }
  };

  const handleCall = () => {
    onCall(contactData);
  };

  const handleChat = () => {
    onChat(contactData);
  };

  const handleSendMoney = () => {
    onSendMoney(contactData);
  };

  return (
    <div className={styles.formOverlay}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>{contact ? 'Edit Contact' : 'Add Contact'}</h2>
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.existingUserSection}>
          <div className={styles.userNavigation}>
            <FaArrowLeft className={styles.navArrow} onClick={handlePrevUser} />
            {existingUsers.length > 0 && (
              <img
                src={existingUsers[selectedUserIndex]?.profilePic || '/default-avatar.png'}
                alt="User profile"
                className={styles.userAvatar}
              />
            )}
            <FaArrowRight className={styles.navArrow} onClick={handleNextUser} />
          </div>
          <hr className={styles.separator} />
        </div>

        <div className={styles.inputGroup}>
          <label>
            Name:
            <input type="text" name="name" value={contactData.name} onChange={handleChange} className={styles.input} />
          </label>
          <label>
            Phone:
            <input type="text" name="phone" value={contactData.phone} onChange={handleChange} className={styles.input} />
          </label>
        </div>
        <div className={styles.inputGroup}>
          <label>
            Email:
            <input type="email" name="email" value={contactData.email} onChange={handleChange} className={styles.input} />
          </label>
          <label>
            Address:
            <input type="text" name="address" value={contactData.address} onChange={handleChange} className={styles.input} />
          </label>
        </div>
        <label className={styles.notesLabel}>
          Notes:
          <textarea name="notes" value={contactData.notes} onChange={handleChange} className={styles.textarea} />
        </label>
        <div className={styles.buttons}>
          <button type="button" onClick={onClose} className={styles.button}>Cancel</button>
          <button type="submit" className={styles.button}>Save</button>
        </div>
        <div className={styles.actionButtons}>
          <button type="button" onClick={handleCall} className={styles.actionButton}>
            <FaPhone /> Call
          </button>
          <button type="button" onClick={handleChat} className={styles.actionButton}>
            <FaComments /> Chat
          </button>
          <button type="button" onClick={handleSendMoney} className={styles.actionButton}>
            <FaDollarSign /> Send Money
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContactForm;
