import { Box, Typography, useMediaQuery } from "@mui/material";
import { MessageSquare, Settings } from "lucide-react";
import theme from "../styles/style";

const HeaderBar: React.FC = () => {
  const issmallscreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#70486d",
        color: "#b1ae59",
        padding: "8px 16px",
        position: "fixed", // Fixed at the top
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000, // Stays on top
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: issmallscreen ? 1 : 2,
        }}
      >
        {/* Message Icon with Background */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#b1ae59", // Light background for icon
            borderRadius: "8px", // Rounded rectangle
            padding: "4px 8px", // Padding for the rectangle
          }}
        >
          <MessageSquare size={20} color="#70486d" />
        </Box>
        <Typography
          variant="h6"
          sx={{
            fontSize: issmallscreen ? "15px" : "20px", // Good size for header
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
            color: "#FFFFFF",
          }}
        >
          Whatsapp-Clone
        </Typography>
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: issmallscreen ? 1 : 2, // Add spacing between icon and text
        }}
      >
        {/* Settings Icon with Background */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#b1ae59", // Light background for icon
            borderRadius: "50%", // Circular background
            padding: "6px", // Adjust padding for the circle
            flexShrink: 0, // Prevent shrinking
          }}
        >
          <Settings size={20} color="#70486d" />
        </Box>
        <Typography
          sx={{
            fontSize: issmallscreen ? "15px" : "16px", // Slightly smaller font for settings
            fontFamily: "'Roboto', sans-serif",
            fontWeight: 500,
            color: "#FFFFFF",
            whiteSpace: "nowrap", // Prevent text from wrapping
            overflow: "visible", // Ensure full text visibility
            textOverflow: "clip", // Avoid ellipsis if there’s space
            flexShrink: 0,
            marginRight: "2rem", // Prevent the text from shrinking
          }}
        >
          Settings
        </Typography>
      </Box>
    </Box>
  );
};

export default HeaderBar;
