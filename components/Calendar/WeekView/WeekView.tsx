import React from 'react';
import styles from './WeekView.module.css';
import moment from 'moment';

interface WeekViewProps {
  selectedDate: Date;
}

const WeekView: React.FC<WeekViewProps> = ({ selectedDate }) => {
  const startOfWeek = moment(selectedDate).startOf('week');
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => startOfWeek.clone().add(i, 'days'));

  return (
    <div className={styles.weekView}>
      {daysOfWeek.map((day, index) => (
        <div key={index} className={styles.day}>
          <div className={styles.dayHeader}>{day.format('dddd, MMMM D')}</div>
          <div className={styles.dayContent}></div>
        </div>
      ))}
    </div>
  );
};

export default WeekView;
