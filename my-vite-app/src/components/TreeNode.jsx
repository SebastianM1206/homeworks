const TreeNode = ({ node, onInsert }) => {
  if (!node) return null;

  return (
    <div className="flex flex-col items-center relative">
      <div className="bg-blue-600 text-white font-bold px-4 py-2 rounded-full min-w-[40px] text-center z-[1]">
        {node.valor}
        <div className="mt-2 space-x-2">
          <button
            className="bg-white text-blue-600 border border-blue-600 rounded px-2 py-1 hover:bg-blue-100"
            onClick={() => onInsert(node, "izquierda")}
          >
            Left
          </button>
          <button
            className="bg-white text-blue-600 border border-blue-600 rounded px-2 py-1 hover:bg-blue-100"
            onClick={() => onInsert(node, "derecha")}
          >
            Right
          </button>
        </div>
      </div>
      <div className="flex justify-center w-full gap-8 relative mt-6">
        <TreeNode node={node.izquierda} onInsert={onInsert} />
        <TreeNode node={node.derecha} onInsert={onInsert} />
      </div>
    </div>
  );
};

export default TreeNode;
