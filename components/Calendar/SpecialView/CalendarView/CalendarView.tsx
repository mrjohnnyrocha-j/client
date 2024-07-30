import React, { useState, useEffect } from "react";
import styles from "./CalendarView.module.css";
import DetailedReplanOverlay from "../DetailedReplanOverlay/DetailedReplanOverlay";
import LeftSectionTable from "../LeftSectionTable/LeftSectionTable";
import WeekView from "../../WeekView/WeekView";


const EVENTS_PER_PAGE = 10;
interface Event {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  orderStatus: string;
  [key: string]: any; // Allows additional properties if needed
}

const CalendarView: React.FC = () => {
  const [view, setView] = useState<"hourly" | "daily" | "weekly" | "monthly">("weekly");
  const [selectedWorkCenter, setSelectedWorkCenter] = useState<string>("Oven TS");
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        const data: Event[] = await response.json();
        const parsedData = data.map(event => ({
          ...event,
          startTime: new Date(event.startTime),
          endTime: new Date(event.endTime)
        }));
        setEvents(parsedData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleViewChange = (view: "hourly" | "daily" | "weekly" | "monthly") => {
    setView(view);
  };

  const handleWorkCenterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWorkCenter(event.target.value);
  };

  const handleEventDoubleClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const onEventDrop = (event: Event, newStartTime: Date, newEndTime: Date) => {
    const updatedEvents = events.map((ev) => {
      if (ev.id === event.id) {
        return { ...ev, startTime: newStartTime, endTime: newEndTime };
      }
      return ev;
    });
    setEvents(updatedEvents);
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * EVENTS_PER_PAGE < events.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedEvents = events.slice(
    currentPage * EVENTS_PER_PAGE,
    (currentPage + 1) * EVENTS_PER_PAGE
  );

  const filteredEvents = events.filter(
    (event) => event.orderStatus !== "Finished"
  );

  return (
    <div className={styles.calendarContainer}>
      <h1>REPLANEAMENTO SECAGEM E COZEDURA</h1>
      <div className={styles.viewOptions}>
        <button onClick={() => handleViewChange("hourly")}>Horário</button>
        <button onClick={() => handleViewChange("daily")}>Diário</button>
        <button onClick={() => handleViewChange("weekly")}>Semanal</button>
        <button onClick={() => handleViewChange("monthly")}>Mensal</button>
      </div>
      <select className={styles.select} value={selectedWorkCenter} onChange={handleWorkCenterChange}>
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
      {/* <WeekView
        selectedDate={selectedDate}
        events={events}
        selectedEquipment={selectedWorkCenter}
        onEventDoubleClick={handleEventDoubleClick}
        onEventDrop={onEventDrop}
      /> */}
      <div className={styles.pagination}>
        <button onClick={handlePreviousPage} disabled={currentPage === 0}>
          Previous
        </button>
        <span>Page {currentPage + 1}</span>
        <button
          onClick={handleNextPage}
          disabled={(currentPage + 1) * EVENTS_PER_PAGE >= events.length}
        >
          Next
        </button>
      </div>
      <LeftSectionTable events={filteredEvents} />
      {selectedEvent && (
        <DetailedReplanOverlay
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default CalendarView;
