import { useDispatch, useSelector } from "react-redux";
import { push, pop, clear } from "../store/slices/StackSlice";
import { useState } from "react";

const Stack = () => {
  const stack = useSelector((state) => state.stack.items); // Obtener la pila
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex items-center justify-center">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Stack con redux my dad</h1>

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Nuevo elemento"
          className="border p-2 mr-2"
        />
        <button
          onClick={() => {
            if (inputValue) {
              dispatch(push(inputValue));
              setInputValue("");
            }
          }}
          className="bg-blue-500 text-white px-4 py-2 mr-2"
        >
          Push
        </button>
        <button
          onClick={() => dispatch(pop())}
          disabled={stack.length === 0}
          className="bg-red-500 text-white px-4 py-2 mr-2"
        >
          Pop
        </button>
        <button
          onClick={() => dispatch(clear())}
          disabled={stack.length === 0}
          className="bg-gray-500 text-white px-4 py-2"
        >
          Clear
        </button>

        <h2 className="text-xl mt-4">Elementos en la pila:</h2>
        <ul className="border p-4 mt-2">
          {stack.length > 0 ? (
            stack
              .slice()
              .reverse()
              .map((item, index) => (
                <li key={index} className="p-1 border-b">
                  {item}
                </li>
              ))
          ) : (
            <p>La pila está vacía.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Stack;
