import React from 'react';
import styles from './DayView.module.css';
import moment from 'moment';

interface DayViewProps {
  selectedDate: Date;
}

const DayView: React.FC<DayViewProps> = ({ selectedDate }) => {
  const hours = Array.from({ length: 24 }, (_, i) => moment({ hour: i }).format('h A'));

  return (
    <div className={styles.dayView}>
      {hours.map((hour, index) => (
        <div key={index} className={styles.hour}>
          {hour}
        </div>
      ))}
    </div>
  );
};

export default DayView;
