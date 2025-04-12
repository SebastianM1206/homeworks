import React, { useState, useEffect } from "react";
import useCollection from "../hooks/UseCollection";

const Crud = () => {
  const [user, setUser] = useState({ name: "" });
  const [editId, setEditId] = useState(null);

  const { add, getAll, isPending, results, update, remove } =
    useCollection("users");

  const getAllDocs = async () => {
    await getAll([]);
  };

  const save = async () => {
    if (user.name.trim() === "") return;

    if (editId) {
      await update(editId, user);
      setEditId(null);
    } else {
      await add(user);
    }
    await getAllDocs();
    setUser({ name: "" });
  };

  const handleSetUser = (event) => {
    setUser({ name: event.target.value });
  };

  const handleEdit = (item) => {
    setUser({ name: item.name });
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    await remove(id);
    await getAllDocs();
  };

  useEffect(() => {
    getAllDocs();
  }, []);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto">
      <input
        type="text"
        onChange={handleSetUser}
        value={user.name}
        placeholder="Enter name"
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="button"
        onClick={save}
        className="w-full px-4 py-2 mb-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        {editId ? "Actualizar" : "Guardar"}
      </button>

      {isPending && (
        <span className="text-yellow-500 font-semibold mt-2">Saving...</span>
      )}

      <ul className="mt-4 w-full">
        {results.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center p-2 mb-2 bg-white border border-gray-200 rounded-md shadow-sm"
          >
            <span>{item.name}</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="text-sm text-yellow-600 hover:text-yellow-800"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Crud;
