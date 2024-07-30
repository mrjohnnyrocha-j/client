import React from 'react';
import styles from './WorkCenterSection.module.css';

interface Event {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  orderStatus: string;
  [key: string]: any; // Allows additional properties if needed
}

interface WorkCenterSectionProps {
  events: Event[];
  selectedWorkCenter: string;
  onEventDoubleClick: (event: Event) => void;
  onEventDrop: (e: React.DragEvent) => void;
  onDragStart: (e: React.DragEvent, event: Event) => void;
  allowDrop: (e: React.DragEvent) => void;
}

const WorkCenterSection: React.FC<WorkCenterSectionProps> = ({
  events,
  selectedWorkCenter,
  onEventDoubleClick,
  onEventDrop,
  onDragStart,
  allowDrop
}) => {
  return (
    <div className={styles.workCenterContainer} onDrop={onEventDrop} onDragOver={allowDrop}>
      <h2>{selectedWorkCenter}</h2>
      <div className={styles.calendarGrid}>
        {events
          .filter(event => event.workCenter === selectedWorkCenter)
          .map(event => (
            <div
              key={event.id}
              className={styles.eventBar}
              onDoubleClick={() => onEventDoubleClick(event)}
              draggable
              onDragStart={(e) => onDragStart(e, event)}
            >
              {event.title}
            </div>
          ))}
      </div>
    </div>
  );
};

export default WorkCenterSection;
