// components/General/Header/Header.tsx
import React from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FaArrowLeft } from 'react-icons/fa';
import styles from './Header.module.css';

interface HeaderProps {
  userProfilePic: string;
  userName: string;
  userEmail: string;
}

const Header: React.FC<HeaderProps> = ({ userProfilePic, userName, userEmail }) => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <header className={styles.header}>
      <button className={styles.backButton} onClick={() => router.back()}>
        <FaArrowLeft /> Back
      </button>
      <div className={styles.profileInfo}>
      <img src={session?.user?.image || '/path/to/profile-pic.jpg'} alt="Current User" className={styles.profilePic} />
        <div>
          <p className={styles.userName}>{userName}</p>
          <p className={styles.userEmail}>{userEmail}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
