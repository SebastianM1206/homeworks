import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerAuth } from "../store/slices/auth/thunks";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: "", password: "", name: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerAuth(form.email, form.password, form.name));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Registrarse
        </h2>

        <input
          type="text"
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="mb-6 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
