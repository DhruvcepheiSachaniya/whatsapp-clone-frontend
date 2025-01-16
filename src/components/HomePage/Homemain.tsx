import React, { useEffect, useState } from "react";
import HeaderBar from "../HeaderBar";
import { Typography, TextField, Button, Box } from "@mui/material";
import { io, Socket } from "socket.io-client";
import { RootState } from "@reduxjs/toolkit/query";
import { useSelector } from "react-redux";

// URL of your WebSocket server
const SOCKET_SERVER_URL = "http://localhost:8080";

const HomeMainPage: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState<string>("");
  const [receivedMessage, setReceivedMessage] = useState<string>("");
  const [toUserId, setToUserId] = useState<string>("");

  const usernumber = useSelector((state: RootState) => state.user.usernumber);

  useEffect(() => {
    // Establish WebSocket connection
    const newSocket = io(SOCKET_SERVER_URL);

    // Store socket instance in state
    setSocket(newSocket);

    // Send user ID to the backend to register the socket
    newSocket.emit("register", { userId: usernumber }); // Replace "user123" with actual user ID

    // Listen for incoming private messages
    newSocket.on(
      "privateMessage",
      (data: { from: string; message: string }) => {
        setReceivedMessage(`Message from ${data.from}: ${data.message}`);
      }
    );

    return () => {
      newSocket.disconnect(); // Clean up connection when component unmounts
    };
  }, [usernumber]);

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
      </Box>
    </>
  );
};

export default HomeMainPage;
