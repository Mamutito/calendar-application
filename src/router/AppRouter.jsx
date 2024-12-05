import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../auth/pages/LoginPage";
import CalendarPage from "../calendar/pages/CalendarPage";
import useAuthStore from "../hooks/useAuthStore";
import { useEffect } from "react";

export const AppRouter = () => {
  const { status: authStatus, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (authStatus === "checking") {
    return <h3>Loading...</h3>;
  }
  return (
    <Routes>
      {authStatus === "authenticated" ? (
        <>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/auth/*" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      )}
    </Routes>
  );
};
