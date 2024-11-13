import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import Navbar from "../components/Navbar";
import { es } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarEvent from "../components/CalendarEvent";
import { useState } from "react";
import CalendarModal from "../components/CalendarModal";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import FabNewButton from "../components/FabNewButton";
import FabDelete from "../components/FabDelete";

const locales = {
  es: es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarPage = () => {
  const { events, calendarSetActive } = useCalendarStore();
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );
  const [modalIsOpen, setIsOpen] = useState(false);

  const doubleClickEvent = (e) => {
    setIsOpen(true);
    console.log(e);
    calendarSetActive(e);
  };
  const addNewEvent = () => {
    setIsOpen(true);
    calendarSetActive(null);
  };
  function closeModal() {
    setIsOpen(false);
  }
  const onSelectEvent = (e) => {
    calendarSetActive(e);
  };
  const viewChangeEvent = (e) => {
    localStorage.setItem("lastView", e);
    setLastView(e);
  };
  return (
    <div>
      <Navbar />
      <Calendar
        localizer={localizer}
        defaultView={lastView}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        eventPropGetter={(event, start, end, isSelected) => {
          let newStyle = {
            backgroundColor: "lightblue",
            color: "black",
            borderRadius: "0px",
            border: "none",
          };
          return {
            className: "",
            style: newStyle,
          };
        }}
        components={{ event: CalendarEvent }}
        onSelectEvent={onSelectEvent}
        onDoubleClickEvent={doubleClickEvent}
        onView={viewChangeEvent}
      />
      <CalendarModal modalIsOpen={modalIsOpen} onClose={closeModal} />
      <FabNewButton onAddEvent={addNewEvent} />
      <FabDelete />
    </div>
  );
};

export default CalendarPage;
