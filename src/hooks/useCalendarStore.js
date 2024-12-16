import { useDispatch, useSelector } from "react-redux";
import {
  eventAdd,
  eventDelete,
  eventSetActive,
  eventUpdate,
  loadingEvents,
} from "../store/calendar/calendarSlice";
import calendarApi from "../api";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const calendarSetActive = (event) => {
    dispatch(eventSetActive(event));
  };

  const startSavingEvent = async (event) => {
    try {
      if (event.id) {
        await calendarApi.put(`/events/${event.id}`, event);
        dispatch(eventUpdate(event));
        return;
      }
      const { data } = await calendarApi.post("/events", event);
      dispatch(eventAdd({ ...event, id: data.id, user }));
    } catch (error) {
      console.log(error);
      Swal.fire("Error saving event", error.response.data.msg, "error");
    }
  };

  const startDeletingEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(eventDelete(activeEvent.id));
    } catch (error) {
      console.log(error);
      Swal.fire("Error deleting event", error.response.data.msg, "error");
    }
  };

  const startLoadingEvents = async () => {
    const { data } = await calendarApi.get("/events");
    const events = data.events.map((event) => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    }));
    dispatch(loadingEvents(events));
  };

  return {
    events,
    activeEvent,
    hasEventActive: !!activeEvent,
    calendarSetActive,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};
