import React from 'react';
import Image from 'next/image';
import styles from './ProfileImage.module.css';

interface ProfileImageProps {
  src: string;
  alt: string;
  size?: number; // Default size for other users
  isCurrentUser?: boolean; // Flag to denote if it's the current user's image
}

const ProfileImage: React.FC<ProfileImageProps> = ({ src, alt, size = 50, isCurrentUser = false }) => {
  const imageSize = isCurrentUser ? size * 1.5 : size; // Current user's image is 1.5 times larger

  return (
    <div className={styles.profileImage} style={{ width: imageSize, height: imageSize }}>
      <Image src={src} alt={alt} width={imageSize} height={imageSize} className={styles.image} />
    </div>
  );
};

export default ProfileImage;
