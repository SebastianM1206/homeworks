import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import LoginPage from "../pages/LoginPageEmail";
import RegisterPage from "../pages/RegisterPage";
import Home from "../pages/Home";

// Rutas protegidas (tanto privadas como públicas)
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  const { status } = useSelector((state) => state.auth);

  if (status === "checking") {
    return <h3>Cargando...</h3>;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/"
        element={
          status === "authenticated" ? (
            <Navigate to="/home" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
