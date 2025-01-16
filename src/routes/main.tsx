import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import { Provider } from "react-redux";
import store, { persistor } from "../redux/store/store";
import { Toaster } from "react-hot-toast";
import HomeMainPage from "../components/HomePage/Homemain";
import { PersistGate } from "redux-persist/integration/react";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/homepage" element={<HomeMainPage />} />
    </Routes>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRoutes />
        </PersistGate>
        <Toaster position="top-center" reverseOrder={false} />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
