import { Box, useMediaQuery } from "@mui/material";
import FirstPart from "./FirstPart";
import SecondPart from "./SecondPart";
import theme from "../../styles/style";

const LoginPage: React.FC = () => {
  const issmallscreen = useMediaQuery(theme.breakpoints.down('sm'));//check if screen is mobile view
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "calc(100vh - 48px)", // Full height minus the header
          marginTop: "48px", // Match header height
        }}
      >
        {/* Left: FirstPart */}
        {issmallscreen ? null :
          <Box sx={{ flex: 1 }}>
            <FirstPart />
          </Box>
        }
        {/* Right: SecondPart */}
        <Box sx={{ flex: 1 }}>
          <SecondPart />
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
