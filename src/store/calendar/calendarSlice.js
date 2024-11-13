import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const tempEvent = {
  _id: new Date().getTime(),
  title: "Birthday",
  notes: "Buy a cake",
  start: new Date(),
  end: addHours(new Date(), 2),
  user: {
    _id: "123",
    name: "Aitor",
  },
};
const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [tempEvent],
    activeEvent: null,
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
        e._id === action.payload._id ? action.payload : e
      );
    },
    eventDelete: (state, action) => {
      state.events = state.events.filter((e) => e._id !== action.payload);
      state.activeEvent = null;
    },
  },
});

export const {
  eventAdd,
  eventSetActive,
  eventClearActive,
  eventUpdate,
  eventDelete,
} = calendarSlice.actions;

export default calendarSlice.reducer;
