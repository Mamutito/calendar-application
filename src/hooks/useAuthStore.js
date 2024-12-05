import { useDispatch, useSelector } from "react-redux";
import calendarApi from "../api";
import {
  checking,
  clearErrorMessage,
  onLogin,
  onLogout,
} from "../store/auth/authSlice";
import { ca } from "date-fns/locale";
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

  const startRegister = async ({ name, email, password }) => {
    try {
      dispatch(checking());
      const { data } = await calendarApi.post("/auth/register", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      console.log(error);
      dispatch(
        onLogout(error.response.data?.msg || "Something went wrong, try again")
      );
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return dispatch(onLogout());
    }
    try {
      const { data } = await calendarApi.get("/auth/renew");
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
  };

  return {
    user,
    status,
    errorMessage,
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  };
};

export default useAuthStore;
