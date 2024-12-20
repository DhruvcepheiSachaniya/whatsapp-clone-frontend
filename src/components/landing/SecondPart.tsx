import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { MessageSquare } from "lucide-react";

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
        gap: 1,
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
      <Typography variant="h5"
        sx={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 600,
          color: "#FFD700", // Gold color
          marginBottom: 1,
        }}>Login Page</Typography>

        <Typography
          sx={{
            fontFamily: "'Roboto', sans-serif",
            fontSize: "16px",
            color: "#E0E0E0", // Light grey
            lineHeight: 1.5,
          }}
        >
          Welcome Back 😊
        </Typography>

      <Box>
        <InputLabel sx={{
          color: '#b1ae59'
        }}>Email</InputLabel>
        <TextField variant="outlined" sx={{
          width: '20rem',
        }}/>
      </Box>

      <Box>
        <InputLabel sx={{
          color: '#b1ae59'
        }}>Password</InputLabel>
        <TextField id="outlined-basic" variant="outlined" sx={{
          width: '20rem',
        }}/>
      </Box>

      <Typography sx={{
        fontFamily: "'Poppins', sans-serif",
        color: "#FFD700",
        cursor: "pointer",
      }}>Forget Password?</Typography>

      <Box>
        <Button variant="contained" color="secondary">Submit</Button>
      </Box>

    </Box>
  );
};

export default SecondPart;
