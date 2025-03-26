import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux"; //import the provider from react-redux
import { store } from "./store/store"; //import the store we created

//Remember, we need to wrap the app with the redux's provider and the store we createds
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
