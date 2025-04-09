import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startLoginWithEmailPassword,
  googleAuth,
} from "../store/slices/auth/thunks";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(startLoginWithEmailPassword(form));
  };
  const handleGoogleLogin = async () => {
    try {
      await dispatch(googleAuth());
      navigate("/home");
    } catch (error) {
      console.log("Error con Google: " + error.message);
    }
  };

  return (
    <div className="flex justify-center h-screen items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Iniciar Sesión
        </h2>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          placeholder="Correo electrónico"
          className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={onChange}
          placeholder="Contraseña"
          className="mb-6 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Iniciar Sesión
        </button>
        <button
          className="mt-2 w-full py-3 bg-white text-gray-800 font-semibold rounded-lg border border-gray-300 flex items-center justify-center space-x-2 hover:bg-gray-100 transition duration-300"
          type="button"
          onClick={handleGoogleLogin}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="25"
            height="25"
            viewBox="0 0 48 48"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
          <span>Iniciar con Google</span>
        </button>
        <p className="mt-4 text-center text-gray-600">
          ¿No tienes cuenta?{" "}
          <Link className="text-blue-500 " to="/register">
            Regístrate aquí
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
