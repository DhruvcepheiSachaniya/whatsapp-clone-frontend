import { Box } from "@mui/material";
import FirstPart from "./FirstPart";
import SecondPart from "./SecondPart";

const SignUpPage: React.FC = () => {
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
        <Box sx={{ flex: 1 }}>
          <FirstPart />
        </Box>
        {/* Right: SecondPart */}
        <Box sx={{ flex: 1 }}>
          <SecondPart />
        </Box>
      </Box>
    </>
  );
};

export default SignUpPage;
