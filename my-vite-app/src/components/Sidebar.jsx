import RenderTree from "./RenderTree";

export default function Sidebar({ tree }) {
  return (
    <div className="w-64 h-screen bg-gray-900 text-gray-100 p-4 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-2">
        Menú
      </h2>
      {RenderTree(tree)}
    </div>
  );
}
