import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeMainPage from "../components/HomePage/Homemain";
import Home from "../components/Home";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/homepage" element={<HomeMainPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
