import { Box, Typography, useMediaQuery } from "@mui/material";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import theme from "../styles/style";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearStorage } from "../redux/slice/userslice";
import { persistor } from "../redux/store/store";

const HeaderBar: React.FC = () => {
  //TODO:- if its on login page then dont't show logout
  const issmallscreen = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    //clear redux storage
    dispatch(clearStorage());

    // Clear any persisted storage if using redux-persist
    persistor.purge();

    // Redirect to login page
    navigate("/");
  };

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
        onClick={() => navigate("/homepage")}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: issmallscreen ? 1 : 2,
          cursor: "pointer",
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
        <Box
          onClick={() => navigate("/profile")}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
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
            <User size={10} color="#70486d" />
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
              // marginRight: "2rem", // Prevent the text from shrinking
            }}
          >
            Profile
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
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
            <Settings size={10} color="#70486d" />
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
              // marginRight: "2rem", // Prevent the text from shrinking
            }}
          >
            Settings
          </Typography>
          {/* logout button */}
          <Box
            onClick={handleLogout}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
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
              {/* <Settings size={20} color="#70486d" /> */}
              <LogOut size={10} color="#70486d" />
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
                // marginRight: "2rem", // Prevent the text from shrinking
              }}
            >
              Logout
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HeaderBar;
