import { Box, Typography } from "@mui/material";

const SecondPart: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%", // Full width of parent container (50% of the screen)
        height: "100%", // Full height of parent container
        backgroundColor: "#664163",
        display: "flex", // Center content
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#FFFFFF",
      }}
    >
      <Typography variant="h1" sx={{ fontSize: "36px" }}>
        Second Part
      </Typography>
    </Box>
  );
};

export default SecondPart;
