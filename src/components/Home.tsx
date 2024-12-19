import { Box } from "@mui/material";
import HeaderBar from "./HeaderBar";
import LoginPage from "./landing/LoginPage";

const Home: React.FC = () => {
  return (
    <Box>
      <HeaderBar />
      <LoginPage />
    </Box>
  );
};

export default Home;
