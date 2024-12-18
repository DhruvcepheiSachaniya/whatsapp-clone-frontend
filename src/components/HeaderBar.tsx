import { Box, Typography } from "@mui/material";
import { MessageSquare } from "lucide-react";
import { Settings } from "lucide-react";

const HeaderBar: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#70486d",
        color: "#b1ae59",
        padding: "8px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <MessageSquare size={18} />
        <Typography variant="h6">Whatsapp-Clone</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Settings size={18} />
        <Typography>settings</Typography>
      </Box>
    </Box>
  );
};

export default HeaderBar;
