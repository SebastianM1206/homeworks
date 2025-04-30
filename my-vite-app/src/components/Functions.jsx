import React, { useState } from "react";
import Button from "./Button";

const Functions = ({ treeRef }) => {
  const [orders, setOrders] = useState({
    inOrder: [],
    preOrder: [],
    postOrder: [],
  });

  const [numberToCheck, setNumberToCheck] = useState(0);
  const [checkResult, setCheckResult] = useState(null); // Nuevo estado

  const handleTraversal = () => {
    if (!treeRef.current) return;

    const inOrder = treeRef.current.inorder();
    const preOrder = treeRef.current.preorder();
    const postOrder = treeRef.current.postorder();

    console.log("InOrder:", inOrder);
    console.log("PreOrder:", preOrder);
    console.log("PostOrder:", postOrder);

    setOrders({ inOrder, preOrder, postOrder });
  };

  const handleCheck = (number) => {
    const parsedNumber = parseInt(number);
    if (isNaN(parsedNumber)) return;

    const result = treeRef.current.contains(parsedNumber);
    setCheckResult(result);
    console.log("Resultado de la búsqueda:", result);
  };

  return (
    <div className="w-full max-w-[600px] p-4 mb-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Funciones del Árbol Binario</h2>

      <input
        type="number"
        value={numberToCheck}
        onChange={(e) => setNumberToCheck(e.target.value)}
        className="border border-gray-300 rounded p-2 mb-4 w-full"
        placeholder="Número a buscar"
      />
      <Button
        text="Buscar valor"
        handleFunction={() => handleCheck(numberToCheck)}
      />

      {checkResult !== null && (
        <div className="text-lg mt-2">
          Resultado de búsqueda:{" "}
          <span className={checkResult ? "text-green-600" : "text-red-600"}>
            {checkResult ? "¡Valor encontrado!" : "Valor no encontrado"}
          </span>
        </div>
      )}

      <button
        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        onClick={handleTraversal}
      >
        Mostrar recorridos
      </button>

      <div className="space-y-2 mt-4 text-gray-800">
        <div>
          <strong>InOrder:</strong> {orders.inOrder.join(" → ")}
        </div>
        <div>
          <strong>PreOrder:</strong> {orders.preOrder.join(" → ")}
        </div>
        <div>
          <strong>PostOrder:</strong> {orders.postOrder.join(" → ")}
        </div>
      </div>
    </div>
  );
};

export default Functions;
