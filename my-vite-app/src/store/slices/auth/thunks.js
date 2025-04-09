import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../../../firebase/config";
import { login, logout, checkingCredentials, register } from "./authSlice";

export const registerAuth = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!response) throw new Error("No se pudo crear el usuario");

      const { user } = response;

      dispatch(register({ email: user.email }));
    } catch (error) {
      console.error("Error en el registro:", error.message);
      throw new Error("Login failed");
    }
  };
};

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const { uid, displayName, photoURL } = result.user;

      dispatch(login({ uid, email, displayName, photoURL }));
      console.log("Login successful:", result.user);
    } catch (error) {
      dispatch(logout({ errorMessage: error.message }));
    }
  };
};

//thunk para cerrar sesión
export const startLogout = () => {
  return async (dispatch) => {
    await signOut(auth);
    dispatch(logout());
  };
};

export const googleAuth = () => {
  return async (dispatch) => {
    try {
      const result = await signInWithPopup(auth, provider);

      const { email } = result.user;
      console.log(email);
      dispatch(login({ email }));
    } catch (error) {
      console.error(" Error al iniciar sesión con Google:", error);
      console.error("📩 error.message:", error?.message);
      throw new Error(
        error?.message || "No se pudo iniciar sesión con Google."
      );
    }
  };
};
