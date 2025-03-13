import React from "react";
import HeaderBar from "../HeaderBar";
import { Box } from "@mui/material";
import FirstChatPart from "./FirstChatPart";
import SecondChatPart from "./SecondChatPart";
import { RootState } from "../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setcurrentImgPreviewUrl } from "../../redux/slice/chatstepper";
import { CircleX } from "lucide-react";

const HomeMainPage: React.FC = () => {
  const dispatch = useDispatch();

  const currentImgPreviewUrl = useSelector(
    (state: RootState) => state.chat.currentImgPreviewUrl
  );

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
          {currentImgPreviewUrl ? (
            <Box
              sx={{
                position: "relative",
                bottom: "205px",
                zIndex: 0,
              }}
            >
              <CircleX
                style={{
                  position: "relative",
                  marginLeft: "5rem",
                  cursor: "pointer",
                }}
                onClick={() => dispatch(setcurrentImgPreviewUrl(null))}
              />
              <img
                src={URL.createObjectURL(currentImgPreviewUrl)}
                alt="preview"
                style={{ width: "100px", height: "100px" }}
              />
            </Box>
          ) : undefined}
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
