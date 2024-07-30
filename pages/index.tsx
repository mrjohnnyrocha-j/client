import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import Slogan from '../components/Home/HomeSidebar/Slogan/Slogan';

import styles from '../styles/index.module.css';

interface IndexPageProps {
  activeTabs: string[];
  setActiveTabs: React.Dispatch<React.SetStateAction<string[]>>;
}

const IndexPage: React.FC<IndexPageProps> = ({ activeTabs, setActiveTabs }) => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const router = useRouter();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  const sections = ['heroSection', 'aboutSection', 'featuresSection', 'contactSection'];

  const handleScroll = (event: React.WheelEvent) => {
    if (event.deltaY > 0) {
      setCurrentSection((prev) => (prev < sections.length - 1 ? prev + 1 : prev));
    } else {
      setCurrentSection((prev) => (prev > 0 ? prev - 1 : prev));
    }
  };

  useEffect(() => {
    const sectionId = sections[currentSection];
    const sectionElement = document.getElementById(sectionId);
    sectionElement?.scrollIntoView({ behavior: 'smooth' });
  }, [currentSection]);

  useEffect(() => {
    if (activeTabs.includes('/')) {
      setHasScrolled(false);
    }
  }, [activeTabs]);

  const handleLinkClick = (path: string) => {
    setActiveTabs((prevTabs) => {
      const newTabs = prevTabs.filter((tab) => tab !== path);
      return [...newTabs, path];
    });
  };

  if (status === 'loading') {
    return <div className={styles.loading} aria-label="Loading content">Loading...</div>;
  }

  if (status === 'unauthenticated') {
    router.push('/auth/sign-in');
    return null;
  }

  return (
    <div className={styles.container} onWheel={handleScroll}>
      <Head>
        <title>YJ4 - Social Media, AI Interaction, Productivity</title>
        <meta name="description" content="Welcome to YJ4, your hub for social media, AI interaction, productivity, and digital services." />
        <meta property="og:title" content="YJ4 - Your Digital Hub" />
        <meta property="og:description" content="Connect, interact, and boost productivity with YJ4." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/assets/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <header className={styles.header}>
      
        <nav className={styles.nav}>
          {session ? (
            <>
              <Link href={`/profile/${user?.id}`}>Profile</Link>
              <Link href="/api/auth/signout">Sign Out</Link>
            </>
          ) : (
            <>
              <Link href="/auth/sign-in">Sign In</Link>
              <Link href="/auth/sign-up">Sign Up</Link>
            </>
          )}
        </nav>
      </header>

      <main className={styles.main}>
        <section id="heroSection" className={styles.heroSection}>
        <div className={styles.logo}>
          <Image src="/assets/j_logo.png" alt="YJ4 Logo" width={65} height={260} />
        </div>
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >  
            <h1 className={styles.title}>
              {session ? `Welcome back, ${user?.name}!` : 'Welcome to YJ4'}
            </h1>
            <Slogan key={activeTabs.join()} />
          </motion.div>

          <motion.p
            className={styles.description}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            {session
              ? "Explore your hub for social media, AI interaction, productivity, and digital services."
              : "Your hub for social media, AI interaction, productivity, and digital services."}
          </motion.p>
        </section>

        <section id="aboutSection" className={styles.aboutSection}>
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            About Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            YJ4 is a platform where you can connect with friends, interact with AI, boost your productivity, and access a variety of digital services.
          </motion.p>
        </section>

        <section id="featuresSection" className={styles.featuresSection}>
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            Features
          </motion.h2>
          <div className={styles.grid}>
            {[
              { path: '/community', title: 'Social Media', description: 'Connect with friends and the world around you.' },
              { path: '/chat', title: 'AI Interaction', description: 'Interact with the latest AI technology.' },
              { path: '/calendar', title: 'Productivity', description: 'Boost your productivity with our tools.' },
              { path: '/calls', title: 'Digital Services', description: 'Access a variety of digital services.' },
            ].map((item, index) => (
              <div key={item.path} onClick={() => handleLinkClick(item.path)}>
                <motion.a
                  className={styles.card}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 + index * 0.3, duration: 1 }}
                >
                  <h3>{item.title} &rarr;</h3>
                  <p>{item.description}</p>
                </motion.a>
              </div>
            ))}
          </div>
        </section>

        <section id="contactSection" className={styles.contactSection}>
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            Contact Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Reach out to us for any questions or support.
          </motion.p>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2024 YJ4. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default IndexPage;
