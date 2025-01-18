import React, { useEffect, useState } from "react";
import HeaderBar from "../HeaderBar";
import { Typography, TextField, Button, Box } from "@mui/material";
import { io, Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import FirstChatPart from "./FirstChatPart";
import SecondChatPart from "./SecondChatPart";

// URL of your WebSocket server
const SOCKET_SERVER_URL = "http://localhost:8080";

const HomeMainPage: React.FC = () => {
  //TODO1:- Able to search only those in contacts and as well as in all, 
  //TODO2:- onclick it should show the chat, 
  //TODO3:- able to chat with, 
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState<string>("");
  const [receivedMessage, setReceivedMessage] = useState<string>("");
  const [toUserId, setToUserId] = useState<string>("");

  const usernumber = useSelector((state: any) => state.user.userNumber);

  // useEffect(() => {
  //   // Establish WebSocket connection
  //   const newSocket = io(SOCKET_SERVER_URL);

  //   // Store socket instance in state
  //   setSocket(newSocket);

  //   // Send user ID to the backend to register the socket
  //   newSocket.emit("register", { userId: usernumber }); // Replace "user123" with actual user ID

  //   // Listen for incoming private messages
  //   newSocket.on(
  //     "privateMessage",
  //     (data: { from: string; message: string }) => {
  //       setReceivedMessage(`Message from ${data.from}: ${data.message}`);
  //     }
  //   );

  //   return () => {
  //     newSocket.disconnect(); // Clean up connection when component unmounts
  //   };
  // }, [usernumber]);

  const sendMessage = () => {
    if (!toUserId || !message) {
      console.log("Recipient ID or message is empty");
      return;
    }
    if (socket) {
      console.log(
        `Sending privateMessage to ${toUserId} with message ${message}`
      );
      socket.emit("privateMessage", {
        toUserId: toUserId,
        message,
      });
    }
  };

  return (
    <>
      <HeaderBar />
      {/* implement firstchat and secondcaht here */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "calc(100vh - 48px)", // Full height minus the header
          marginTop: "48px", // Match header height
          padding: "2rem", //to make look like center
        }}
      >
        <Box sx={{ width: "30%" }}>
          <FirstChatPart />
        </Box>
        <Box sx={{ width: "70%" }}>
          <SecondChatPart />
        </Box>
      </Box>

      {/* implemented socket code */}
      {/* <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 48px)", // Full height minus the header
          marginTop: "48px", // Match header height
        }}
      >
        <Typography variant="h6">Chat Section</Typography>
        <TextField
          label="Recipient User ID"
          value={toUserId}
          onChange={(e) => setToUserId(e.target.value)}
          fullWidth
        />
        <TextField
          label="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
          multiline
        />
        <Button variant="contained" onClick={sendMessage}>
          Send Message
        </Button>
        <Typography variant="body1" style={{ marginTop: "20px" }}>
          {receivedMessage || "No messages yet"}
        </Typography>
      </Box> */}
    </>
  );
};

export default HomeMainPage;
