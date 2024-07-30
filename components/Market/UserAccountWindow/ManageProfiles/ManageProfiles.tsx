import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ManageProfiles.module.css';

const ManageProfiles: React.FC = () => {
  const [profiles, setProfiles] = useState([]);
  const [newProfileName, setNewProfileName] = useState('');

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('/api/profiles');
        setProfiles(response.data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };
    fetchProfiles();
  }, []);

  const handleAddProfile = async () => {
    try {
      const response = await axios.post('/api/profiles', { name: newProfileName });
      // setProfiles([...profiles, response.data]);
      setNewProfileName('');
    } catch (error) {
      console.error('Error adding profile:', error);
    }
  };

  const handleDeleteProfile = async (profileId: number) => {
    try {
      await axios.delete(`/api/profiles/${profileId}`);
      // setProfiles(profiles.filter(profile => profile.id !== profileId));
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  return (
    <div className={styles.manageProfiles}>
      <h3>Manage Profiles</h3>
      {/* <ul>
        {profiles.map(profile => (
          <li key={profile.id}>
            {profile.name}
            <button onClick={() => handleDeleteProfile(profile.id)}>Delete</button>
          </li>
        ))}
      </ul> */}
      <input
        type="text"
        value={newProfileName}
        onChange={(e) => setNewProfileName(e.target.value)}
        placeholder="New Profile Name"
      />
      <button onClick={handleAddProfile}>Add Profile</button>
    </div>
  );
};

export default ManageProfiles;
