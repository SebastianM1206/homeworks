import { Link } from "react-router-dom";
//render for the sidebar tree structure
// This component recursively renders a tree structure of links for the sidebar menu.
const RenderTree = (node) => {
  return (
    <ul className="pl-4 space-y-2">
      {node.children.map((child) => (
        <li key={child.link}>
          <Link
            className="block px-2 py-1 rounded hover:bg-gray-800 hover:text-white transition-colors"
            to={child.link}
          >
            {child.title}
          </Link>
          {child.children.length > 0 && RenderTree(child)}
        </li>
      ))}
    </ul>
  );
};

export default RenderTree;
