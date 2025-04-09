import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { status } = useSelector((state) => state.auth);

  return status === "authenticated" ? children : <Navigate to="/login" />; //La idea es que con el estado de redux se compruebe si se está o no autenticado y si no que se redireccione
};
