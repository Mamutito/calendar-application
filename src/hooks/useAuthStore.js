import { useDispatch, useSelector } from "react-redux";
import calendarApi from "../api";
import {
  checking,
  clearErrorMessage,
  onLogin,
  onLogout,
} from "../store/auth/authSlice";
import { set } from "date-fns";

const useAuthStore = () => {
  const { user, status, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const startLogin = async ({ email, password }) => {
    try {
      dispatch(checking());
      const { data } = await calendarApi.post("/auth", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogout("Invalid email or password"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  return { user, status, errorMessage, startLogin };
};

export default useAuthStore;
