import React from "react";
import HeaderBar from "../HeaderBar";
import { Box } from "@mui/material";
import FirstChatPart from "./FirstChatPart";
import SecondChatPart from "./SecondChatPart";

const HomeMainPage: React.FC = () => {
  //TODO1:- Able to search only those in contacts and as well as in all,
  //TODO2:- onclick it should show the chat,
  //TODO3:- able to chat with,

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
