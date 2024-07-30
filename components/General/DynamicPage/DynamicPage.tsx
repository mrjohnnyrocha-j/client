import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './DynamicPage.module.css';

const DynamicPage: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api${pathname}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [pathname]);

  if (!data) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.dynamicPageContainer}>
      <h1 className={styles.title}>{data.title}</h1>
      <p className={styles.content}>{data.content}</p>
    </div>
  );
};

export default DynamicPage;
