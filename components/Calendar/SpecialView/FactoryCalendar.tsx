import React, { useState, useEffect } from 'react';
import styles from './FactoryCalendar.module.css';
import DetailedReplanOverlay from './DetailedReplanOverlay/DetailedReplanOverlay';
import LeftSectionTable from './LeftSectionTable/LeftSectionTable';
import WorkCenterSection from './WorkCenterSection/WorkCenterSection';
import FactoryPlan from './FactoryPlan/FactoryPlan';
import WeekView from '../WeekView/WeekView';
import MainSectionTable from './SectionTables/MainSectionTable';
import Planning from './Planning/Planning';

interface Event {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  orderStatus: string;
  [key: string]: any; // Allows additional properties if needed
}

const FactoryCalendar: React.FC = () => {
  const [view, setView] = useState<'hourly' | 'daily' | 'weekly' | 'monthly'>('weekly');
  const [selectedWorkCenter, setSelectedWorkCenter] = useState<string>('Oven TS');
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isoladores, setIsoladores] = useState([]);
  const [autores, setAutores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsResponse, isoladoresResponse, autoresResponse] = await Promise.all([
          fetch('/api/events'),
          fetch('/api/isoladores'),
          fetch('/api/autores')
        ]);
        const eventsData: Event[] = await eventsResponse.json();
        const isoladoresData = await isoladoresResponse.json();
        const autoresData = await autoresResponse.json();

        const parsedEvents = eventsData.map(event => ({
          ...event,
          startTime: new Date(event.startTime),
          endTime: new Date(event.endTime)
        }));
        
        setEvents(parsedEvents);
        setIsoladores(isoladoresData);
        setAutores(autoresData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleViewChange = (view: 'hourly' | 'daily' | 'weekly' | 'monthly') => {
    setView(view);
  };

  const handleWorkCenterChange = (section: string) => {
    setSelectedWorkCenter(section);
  };

  const handleEventDoubleClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleEventDrop = (event: Event, newStartTime: Date, newEndTime: Date) => {
    const updatedEvents = events.map((e) => {
      if (e.id === event.id) {
        return { ...e, startTime: newStartTime, endTime: newEndTime };
      }
      return e;
    });
    setEvents(updatedEvents);
  };

  const onDragStart = (e: React.DragEvent, event: Event) => {
    e.dataTransfer.setData('eventId', event.id);
    e.dataTransfer.setData('newStartTime', event.startTime.toString());
    e.dataTransfer.setData('newEndTime', event.endTime.toString());
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const eventId = e.dataTransfer.getData('eventId');
    const newStartTime = new Date(e.dataTransfer.getData('newStartTime'));
    const newEndTime = new Date(e.dataTransfer.getData('newEndTime'));
    const updatedEvents = events.map((event) => {
      if (event.id === eventId) {
        return { ...event, startTime: newStartTime, endTime: newEndTime };
      }
      return event;
    });
    setEvents(updatedEvents);
  };

  const allowDrop = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className={styles.calendarContainer}>
      <h1 className={styles.title}>Factory Calendar</h1>
      <FactoryPlan onSectionClick={handleWorkCenterChange} />
      <select
        className={styles.select}
        value={selectedWorkCenter}
        onChange={(e) => handleWorkCenterChange(e.target.value)}
      >
        <option value="Oven TS">Oven TS</option>
        <option value="Oven 1">Oven 1</option>
        <option value="Oven 2">Oven 2</option>
        <option value="Greenhouse 1">Greenhouse 1</option>
        <option value="Assembly Area">Assembly Area</option>
        <option value="Packaging Area">Packaging Area</option>
        <option value="Tank">Tank</option>
        <option value="Extrusion Machine">Extrusion Machine</option>
        <option value="Turning Machine">Turning Machine</option>
        <option value="Vibration Machine">Vibration Machine</option>
        <option value="Filtering Machine">Filtering Machine</option>
        <option value="Human Resources">Human Resources</option>
        <option value="Accounting">Accounting</option>
        <option value="Executive">Executive</option>
        <option value="Managing">Managing</option>
        <option value="Admin">Admin</option>
        <option value="IT">IT</option>
        <option value="Racks">Racks</option>
        <option value="Pallets">Pallets</option>
        <option value="Wagons">Wagons</option>
        <option value="Transporting Equips">Transporting Equips</option>
        <option value="Grinding Area">Grinding Area</option>
      </select>
      <div className={styles.sectionsContainer}>
        <div className={styles.workCenterSection}>
          <div className={styles.viewOptions}>
            <button onClick={() => handleViewChange('hourly')}>Hourly</button>
            <button onClick={() => handleViewChange('daily')}>Daily</button>
            <button onClick={() => handleViewChange('weekly')}>Weekly</button>
            <button onClick={() => handleViewChange('monthly')}>Monthly</button>
          </div>
          {/* {view === 'weekly' && (
            <WeekView
              selectedDate={new Date()}
              events={events}
              selectedEquipment={selectedWorkCenter}
              onEventDoubleClick={handleEventDoubleClick}
              onEventDrop={handleEventDrop}
            />
          )} */}
          {selectedEvent && (
            <DetailedReplanOverlay
              event={selectedEvent}
              onClose={() => setSelectedEvent(null)}
            />
          )}
        </div>
        <div className={styles.tableSection}>
          <MainSectionTable />
          <LeftSectionTable events={events} />
        </div>
      </div>
      <div className={styles.planningSection}>
        <Planning isolators={isoladores} authors={autores} />
      </div>
    </div>
  );
};

export default FactoryCalendar;
