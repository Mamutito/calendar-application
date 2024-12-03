import { configureStore } from "@reduxjs/toolkit";
import calendarSlice from "./calendar/calendarSlice";
import authSlice from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    calendar: calendarSlice,
    auth: authSlice,
  },
});
