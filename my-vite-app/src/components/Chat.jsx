// src/components/Chat.js
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFirebaseData,
  addDataToFirebase,
} from "../store/slices/FirebaseThunks";

const Chat = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.firebase);
  const [message, setMessage] = useState("");
  const chatEndRef = useRef(null);

  const handleSend = () => {
    if (message.trim() !== "") {
      dispatch(addDataToFirebase({ text: message }));
      setMessage("");
    }
  };

  useEffect(() => {
    dispatch(fetchFirebaseData());
  }, [dispatch]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col h-[90vh] w-full max-w-md bg-white rounded-md shadow-lg">
        <div className="bg-green-500 text-white text-center py-4 rounded-t-md">
          <h2 className="text-xl font-semibold">Chat en Tiempo Real</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
          {loading ? (
            <p className="text-gray-500 text-center">Cargando mensajes...</p>
          ) : (
            data.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[70%] px-4 py-2 rounded-xl shadow-sm ${
                  index % 2 === 0
                    ? "bg-green-100 self-end text-right ml-auto"
                    : "bg-gray-200 self-start text-left"
                }`}
              >
                {msg.text}
              </div>
            ))
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="p-4 border-t flex gap-2">
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            className="flex-1 border border-gray-300 p-2 rounded-full outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
