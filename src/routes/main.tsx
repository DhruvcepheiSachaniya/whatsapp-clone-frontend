import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store, { persistor } from "../redux/store/store";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";
import "../App.css";
import { SocketProvider } from "../components/HomePage/socket";
import AppRoutes from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SocketProvider>
        <AppRoutes />
      </SocketProvider>
    </PersistGate>
    <Toaster position="top-center" reverseOrder={false} />
  </Provider>
);
