import { Box, Typography } from "@mui/material";
import { MessageSquare } from "lucide-react";

const SecondChatPart = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        backgroundColor: "#51344F",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          maxWidth: "80%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "fit-content",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#b1ae59", // Light background for icon
            borderRadius: "8px", // Rounded rectangle
            padding: "4px 8px", // Padding for the rectangle
          }}
        >
          <MessageSquare size={20} color="#70486d" />
        </Box>
        {/* Message Icon with Background */}
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

export default SecondChatPart;
