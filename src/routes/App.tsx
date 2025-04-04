import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeMainPage from "../components/HomePage/Homemain";
import Home from "../components/Home";
import ProfilePage from "../components/profile/ProfilePage";
import Calling from "../components/calling";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/homepage" element={<HomeMainPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/call" element={<Calling /> } />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
