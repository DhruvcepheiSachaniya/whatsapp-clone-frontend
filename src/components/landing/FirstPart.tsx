import { Box, Typography } from "@mui/material";

const FirstPart: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%", // Full width of parent container (50% of the screen)
        height: "100%", // Full height of parent container
        backgroundColor: "#51344F",
        display: "flex", // Center content
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        color: "#FFFFFF",
      }}
    >
      {/* Decorative Box */}
      {Array(3).fill('box').map((_, index) => (
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        gap: '30px'
      }}>
      {Array(3).fill('box').map((_, index) => (
        <Box
        key={index}
        sx={{
          backgroundColor: "rgb(112, 72, 109)",
          height: "108px",
          width: "108px",
          borderRadius: "12px",
        }}
        ></Box>
      ))}
      </Box>
      ))}

      {/* <Box
        sx={{
          backgroundColor: "rgb(112, 72, 109)",
          height: "108px",
          width: "108px",
          borderRadius: "12px",
        }}
      ></Box> */}

      {/* Typography Section */}
      <Box
        sx={{
          textAlign: "center",
          maxWidth: "80%",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
            color: "#FFD700", // Gold color
            marginBottom: 1,
          }}
        >
          Join our Community!
        </Typography>
        <Typography
          sx={{
            fontFamily: "'Roboto', sans-serif",
            fontSize: "16px",
            color: "#E0E0E0", // Light grey
            lineHeight: 1.5,
          }}
        >
          Connect with friends, share moments, and stay in touch with your loved
          ones.
        </Typography>
      </Box>
    </Box>
  );
};

export default FirstPart;
