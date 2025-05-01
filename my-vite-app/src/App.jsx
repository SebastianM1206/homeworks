import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { sideBarTree } from "./utils/tree"; // Import the tree structure

//metho it helps to automatically create the tree structure for the sidebar menu.
const getRoutes = (node) => {
  let routes = [];

  for (const child of node.children) {
    if (child.component) {
      routes.push(
        <Route
          key={child.link}
          path={child.link}
          element={<child.component />}
        />
      );
    }

    if (child.children.length > 0) {
      routes = routes.concat(getRoutes(child));
    }
  }
  return routes;
};

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar tree={sideBarTree} />
        <div className="p-4 flex-1">
          <Routes>{getRoutes(sideBarTree)}</Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
