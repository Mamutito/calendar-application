import calendarSlice from "./calendar/calendarSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    calendar: calendarSlice,
  },
});
