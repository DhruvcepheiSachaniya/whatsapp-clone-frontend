import { Box, Button, Typography } from "@mui/material";
import { MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { setChatAreastepper, setcurrentUserSocketId } from "./chatSlice"; // Assuming your Redux actions are defined here

const SecondChatPart = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);
  // const dispatch = useDispatch();

  console.log(messages);

  const chatareastepper = useSelector(
    (state: any) => state.stepper.chatAreastepper
  );

  const currentSocketId = useSelector(
    (state: any) => state.chat.currentUserSocketId
  );

  const socket = useSelector((state: any) => state.chat.soket);

  // Listen for incoming messages
  // Listen for incoming messages with cleanup to avoid duplicate handlers
  useEffect(() => {
    if (socket) {
      const messageHandler = (msg) => {
        // Prevent adding the same message twice
        if (!messages.some((message) => message.message === msg.message)) {
          setMessages((prevMessages) => [...prevMessages, msg]);
        }
      };

      socket.on("privateMessageReceived", messageHandler);

      return () => {
        socket.off("privateMessageReceived", messageHandler);
      };
    }
  }, [socket, messages]);

  // Send message
  const sendMessage = () => {
    if (!currentSocketId || !message) {
      console.log("Recipient ID or message is empty");
      return;
    }
    if (socket) {
      const msg = {
        toUserId: currentSocketId,
        message,
      };
      socket.emit("privateMessage", msg);
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...msg, fromSelf: true },
      ]);
      setMessage(""); // Clear input
    }
  };

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
            {messages.map((msg, index) => (
              <Box
                key={index}
                className={`chat ${msg.fromSelf ? "chat-end" : "chat-start"}`}
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Avatar"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {msg.fromSelf ? "You" : "Other User"}
                  <time className="text-xs opacity-50">12:46</time>
                </div>
                <div className="chat-bubble">{msg.message}</div>
                <div className="chat-footer opacity-50">Delivered</div>
              </Box>
            ))}
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
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button variant="contained" onClick={sendMessage}>
              Send
            </Button>
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
            Connect with friends, share moments, and stay in touch with your
            loved ones.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SecondChatPart;
