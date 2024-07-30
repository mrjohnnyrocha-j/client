// pages/auth/settings.tsx
import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import axios from 'axios';
import LoadingIndicator from '@/General/LoadingIndicator/LoadingIndicator';
import styles from '../../styles/auth/settings.module.css';
import Header from '../../components/Auth/Settings/Header/Header';

const UserSettings: React.FC = () => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPreloader, setShowPreloader] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const handleUpdateEmail = async () => {
    if (!newEmail) {
      setMessage({ type: 'error', text: 'Please enter a valid email.' });
      return;
    }
    setShowPreloader(true);
    try {
      const response = await axios.post('/api/update-email', { email: user?.email, newEmail });
      setMessage({ type: 'success', text: 'Email updated successfully!' });
      console.log(response.data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update email.' });
      console.error(error);
    } finally {
      setShowPreloader(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!password) {
      setMessage({ type: 'error', text: 'Please enter a valid password.' });
      return;
    }
    setShowPreloader(true);
    try {
      const response = await axios.post('/api/update-password', { email: user?.email, password });
      setMessage({ type: 'success', text: 'Password updated successfully!' });
      console.log(response.data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update password.' });
      console.error(error);
    } finally {
      setShowPreloader(false);
    }
  };

  const handleUpdateProfile = async () => {
    setShowPreloader(true);
    try {
      const response = await axios.post('/api/update-profile', { email: user?.email, bio, avatarUrl });
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      console.log(response.data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile.' });
      console.error(error);
    } finally {
      setShowPreloader(false);
    }
  };

  const handleDeleteAccount = async () => {
    setShowPreloader(true);
    try {
      const response = await axios.post('/api/delete-account', { email: user?.email });
      console.log(response.data);
      signOut();
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete account.' });
      console.error(error);
    } finally {
      setShowPreloader(false);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Please sign in to view your settings.</div>;
  }

  return (
    <div className={styles.settingsContainer}>
      <Header
        userProfilePic={user?.image || '/default-avatar.png'}
        userName={user?.name || 'User Name'}
        userEmail={user?.email || 'user@example.com'}
      />
      {showPreloader && (
        <div className={styles.preloader}>
          <LoadingIndicator />
        </div>
      )}
      <div className={styles.mainContent}>
        <h1>User Settings</h1>
        {session && (
          <>
            <div className={styles.settingsSection}>
              <h2>Profile</h2>
              <p>Email: {user?.email}</p>
              <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
                <label htmlFor="newEmail">New Email:</label>
                <input
                  type="email"
                  id="newEmail"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className={styles.input}
                />
                <button type="button" onClick={handleUpdateEmail} className={styles.button}>
                  Update Email
                </button>
              </form>
              <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
                <label htmlFor="bio">Bio:</label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className={styles.textarea}
                />
                <label htmlFor="avatarUrl">Avatar URL:</label>
                <input
                  type="url"
                  id="avatarUrl"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className={styles.input}
                />
                <button type="button" onClick={handleUpdateProfile} className={styles.button}>
                  Update Profile
                </button>
              </form>
            </div>
            <div className={styles.settingsSection}>
              <h2>Password</h2>
              <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
                <label htmlFor="password">New Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                />
                <button type="button" onClick={handleUpdatePassword} className={styles.button}>
                  Update Password
                </button>
              </form>
            </div>
            <div className={styles.settingsSection}>
              <h2>Account</h2>
              <button type="button" onClick={handleDeleteAccount} className={`${styles.button} ${styles.deleteButton}`}>
                Delete Account
              </button>
            </div>
            {message.text && (
              <div className={message.type === 'error' ? styles.errorMessage : styles.successMessage}>
                {message.text}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserSettings;
