import { useDispatch, useSelector } from "react-redux";
import {
  eventAdd,
  eventDelete,
  eventSetActive,
  eventUpdate,
} from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();
  const calendarSetActive = (event) => {
    dispatch(eventSetActive(event));
  };

  const startSavingEvent = async (event) => {
    //backend call
    if (event._id) {
      dispatch(eventUpdate(event));
    } else {
      dispatch(eventAdd({ ...event, _id: new Date().getTime() }));
    }
  };

  const startDeletingEvent = () => {
    dispatch(eventDelete(activeEvent._id));
  };
  return {
    events,
    activeEvent,
    hasEventActive: !!activeEvent,
    calendarSetActive,
    startSavingEvent,
    startDeletingEvent,
  };
};
