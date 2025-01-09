import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import { Provider } from "react-redux";
import store from "../redux/store/store";
import { Toaster } from "react-hot-toast";
import HomeMainPage from "../components/HomePage/main";

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
        <AppRoutes />
        <Toaster position="top-center" reverseOrder={false} />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
