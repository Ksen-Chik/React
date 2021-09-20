import { Routes } from "./components/routes";
import "./App.css";
import { Provider } from "react-redux";
import { store, persistor } from "./components/store";
import { PersistGate, } from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
}

export default App;