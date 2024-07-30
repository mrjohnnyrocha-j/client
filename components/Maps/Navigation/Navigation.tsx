import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import BrowserHeader from '../../Browsers/BrowserHeader/BrowserHeader';
import Navigation from '../../Maps/Navigation/Navigation';
import styles from './Navigation.module.css';

const MapComponent = dynamic(() => import('../MapComponent/MapComponent'), { ssr: false });

const NavigationPage: React.FC = () => {
  const [currentUrl, setCurrentUrl] = useState<string>('');
  const [startLocation, setStartLocation] = useState<string>('');
  const [endLocation, setEndLocation] = useState<string>('');
  const [transportMode, setTransportMode] = useState<string>('driving-car');

  const handleSearch = (start: string, end: string, mode: string) => {
    setStartLocation(start);
    setEndLocation(end);
    setTransportMode(mode);
  };

  const handleNavigate = (url: string) => {
    setCurrentUrl(url);
  };

  return (
    <div className={styles.container}>
      <BrowserHeader onNavigate={handleNavigate} />
      <div className={styles.content}>
        <Navigation />
        <MapComponent />
      </div>
    </div>
  );
};

export default NavigationPage;
