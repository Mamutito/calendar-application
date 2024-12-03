import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  status: "checking",
  errorMessage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    checking(state) {
      state.user = {};
      state.status = "checking";
      state.errorMessage = null;
    },
    onLogin(state, action) {
      state.status = "authenticated";
      state.user = action.payload;
      state.errorMessage = null;
    },
    onLogout(state, { payload }) {
      state.status = "not-authenticated";
      state.user = {};
      state.errorMessage = payload;
    },
    clearErrorMessage(state) {
      state.errorMessage = null;
    },
  },
});

export const { setUser, onLogin, checking, onLogout, clearErrorMessage } =
  authSlice.actions;
export default authSlice.reducer;
