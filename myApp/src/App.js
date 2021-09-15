import { Routes } from "./components/routes";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./components/store";

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;