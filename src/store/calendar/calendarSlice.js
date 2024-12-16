import { createSlice } from "@reduxjs/toolkit";

const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [],
    activeEvent: null,
    isLoadingEvents: true,
  },
  reducers: {
    eventAdd: (state, action) => {
      state.events.push(action.payload);
      state.activeEvent = null;
    },
    eventSetActive: (state, action) => {
      state.activeEvent = action.payload;
    },
    eventClearActive: (state) => {
      state.activeEvent = null;
    },
    eventUpdate: (state, action) => {
      state.events = state.events.map((e) =>
        e.id === action.payload.id ? action.payload : e
      );
    },
    eventDelete: (state, action) => {
      state.events = state.events.filter((e) => e.id !== action.payload);
      state.activeEvent = null;
    },

    loadingEvents: (state, action) => {
      state.isLoadingEvents = false;
      state.events = action.payload;
    },

    logoutCalendar: (state) => {
      state.events = [];
      state.activeEvent = null;
      state.isLoadingEvents = true;
    },
  },
});

export const {
  eventAdd,
  eventSetActive,
  eventClearActive,
  eventUpdate,
  eventDelete,
  loadingEvents,
  logoutCalendar,
} = calendarSlice.actions;

export default calendarSlice.reducer;
