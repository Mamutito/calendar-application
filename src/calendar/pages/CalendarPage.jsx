import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import Navbar from "../components/Navbar";
import { es } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarEvent from "../components/CalendarEvent";
import { useEffect, useState } from "react";
import CalendarModal from "../components/CalendarModal";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import FabNewButton from "../components/FabNewButton";
import FabDelete from "../components/FabDelete";
import { useSelector } from "react-redux";

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
  const { events, calendarSetActive, startLoadingEvents } = useCalendarStore();
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );
  const { user } = useSelector((state) => state.auth);
  const [modalIsOpen, setIsOpen] = useState(false);

  const doubleClickEvent = (e) => {
    setIsOpen(true);
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

  useEffect(() => {
    startLoadingEvents();
  }, []);

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
          const isMyEvent =
            event.user._id === user.uid || event.user.uid === user.uid;
          let newStyle = {
            backgroundColor: isMyEvent ? "lightblue" : "#465660",
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
