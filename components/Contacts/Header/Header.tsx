// components/Contacts/Header/Header.tsx
import React from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FaArrowLeft, FaUser } from 'react-icons/fa';
import styles from './Header.module.css';

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleBackClick = () => {
    router.back();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <header className={styles.header}>
      <button className={styles.backButton} onClick={handleBackClick}>
        <FaArrowLeft />
      </button>
      <div className={styles.logo}>
      <Image src="/assets/j_logo.png" alt="j Logo" width={26} height={108} />
      </div>
      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchBar}
          placeholder="Search contacts..."
          onChange={handleSearchChange}
        />
      </div>
      <div className={styles.userProfile}>
      <img src={session?.user?.image || '/path/to/profile-pic.jpg'} alt="Current User" className={styles.profilePic} />
        <span>{session?.user?.name}</span>
      </div>
    </header>
  );
};

export default Header;
