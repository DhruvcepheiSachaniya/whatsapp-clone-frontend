import { Box, Button, Typography } from "@mui/material";
import { MessageSquare } from "lucide-react";
import { useSelector } from "react-redux";

const SecondChatPart = () => {
  const chatareastepper = useSelector((state: any) => state.stepper.chatAreastepper);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        backgroundColor: "#51344F",
      }}
    >
      {chatareastepper ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {Array(10)
              .fill("Box")
              .map((_, index) => (
                <Box key={index} className="chat chat-start">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      />
                    </div>
                  </div>
                  <div className="chat-header">
                    Obi-Wan Kenobi
                    <time className="text-xs opacity-50">12:45</time>
                  </div>
                  <div className="chat-bubble">You were the Chosen One!</div>
                  <div className="chat-footer opacity-50">Delivered</div>
                </Box>
              ))}
            <Box className="chat chat-end">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <div className="chat-header">
                You
                <time className="text-xs opacity-50">12:46</time>
              </div>
              <div className="chat-bubble">I hate you!</div>
              <div className="chat-footer opacity-50">Seen at 12:46</div>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              padding: "1rem",
              borderTop: "1px solid #70486d",
              backgroundColor: "#51344F",
            }}
          >
            <input type="text" placeholder="Type here" className="input input-bordered w-full" />
            <Button variant="contained">Send</Button>
          </Box>
        </Box>
      ) : (
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
              backgroundColor: "#b1ae59",
              borderRadius: "8px",
              padding: "4px 8px",
            }}
          >
            <MessageSquare size={20} color="#70486d" />
          </Box>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              color: "#FFD700",
              marginBottom: 1,
            }}
          >
            Join our Community!
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Roboto', sans-serif",
              fontSize: "16px",
              color: "#E0E0E0",
              lineHeight: 1.5,
            }}
          >
            Connect with friends, share moments, and stay in touch with your loved ones.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SecondChatPart;
