import React from 'react';
import ProfileImage from '../ProfileImage/ProfileImage';
import styles from './PageHeader.module.css';

const PageHeader: React.FC = () => {
  const currentUserProfile = '/path/to/current/user/profile.jpg'; // Replace with actual path
  const otherUserProfiles = [
    '/path/to/other/user1.jpg',
    '/path/to/other/user2.jpg',
    '/path/to/other/user3.jpg',
  ]; // Replace with actual paths

  return (
    <div className={styles.pageHeader}>
      <ProfileImage src={currentUserProfile} alt="Current User" isCurrentUser />
      {otherUserProfiles.map((src, index) => (
        <ProfileImage key={index} src={src} alt={`User ${index + 1}`} />
      ))}
    </div>
  );
};

export default PageHeader;
