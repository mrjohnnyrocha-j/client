// components/Header/Header.tsx
import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FaSearch, FaUserCircle, FaSignOutAlt, FaArrowLeft } from 'react-icons/fa';
import styles from './Header.module.css';
import Image from 'next/image';

const Header: React.FC = () => {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${searchQuery}`);
  };

  return (
    <header className={styles.header}>
            <div className={styles.logo} onClick={() => router.push('/')}>  
        <Image src="/assets/j_logo.png" alt="j Logo" width={26} height={108} />
        picture-posts
      </div>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          <FaSearch />
        </button>
      </form>
      <FaArrowLeft className={styles.icon} onClick={() => router.back()} />
      <div className={styles.profile}>
        {session ? (
          <>
              <img src={session?.user?.image || '/path/to/profile-pic.jpg'} alt="Current User" className={styles.profilePic} />
            <button onClick={() => signOut()} className={styles.signOutButton}>
              <FaSignOutAlt /> Sign Out
            </button>
          </>
        ) : (
          <button onClick={() => router.push('/auth/signin')} className={styles.signInButton}>
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
