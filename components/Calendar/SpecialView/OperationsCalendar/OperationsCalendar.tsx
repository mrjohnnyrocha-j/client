import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styles from './OperationsCalendar.module.css';

interface Event {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  orderStatus: string;
  [key: string]: any; // Allows additional properties if needed
}

interface OperationsCalendarProps {
  events: Event[];
  selectedEquipment: string;
  view: 'hourly' | 'daily' | 'weekly' | 'monthly';
}

const OperationsCalendar: React.FC<OperationsCalendarProps> = ({ events, selectedEquipment, view }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (selectedDate && selectedEquipment) {
      const filtered = events.filter(event => {
        const eventDate = new Date(event.startTime);
        return event.element === selectedEquipment && isSameView(eventDate, selectedDate, view);
      });
      setFilteredEvents(filtered);
    }
  }, [selectedDate, selectedEquipment, view, events]);

  const isSameView = (eventDate: Date, selectedDate: Date, view: string) => {
    switch (view) {
      case 'hourly':
        return eventDate.getFullYear() === selectedDate.getFullYear() &&
               eventDate.getMonth() === selectedDate.getMonth() &&
               eventDate.getDate() === selectedDate.getDate() &&
               eventDate.getHours() === selectedDate.getHours();
      case 'daily':
        return eventDate.getFullYear() === selectedDate.getFullYear() &&
               eventDate.getMonth() === selectedDate.getMonth() &&
               eventDate.getDate() === selectedDate.getDate();
      case 'weekly':
        const startOfWeek = new Date(selectedDate);
        startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return eventDate >= startOfWeek && eventDate <= endOfWeek;
      case 'monthly':
        return eventDate.getFullYear() === selectedDate.getFullYear() &&
               eventDate.getMonth() === selectedDate.getMonth();
      default:
        return false;
    }
  };

  return (
    <div className={styles.calendarContainer}>
      <h2>Operations Calendar</h2>
      <div className={styles.datePicker}>
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => setSelectedDate(date)}
          showTimeSelect
          dateFormat="Pp"
        />
      </div>
      <div>
        {filteredEvents.length > 0 ? (
          <ul>
            {filteredEvents.map(event => (
              <li key={event.id}>
                <div>{event.title}</div>
                <div>{new Date(event.startTime).toLocaleString()}</div>
                <div>{event.status}</div>
                <div>{event.details}</div>
              </li>
            ))}
          </ul>
        ) : (
          <div>No events found for the selected date and equipment.</div>
        )}
      </div>
    </div>
  );
};

export default OperationsCalendar;
