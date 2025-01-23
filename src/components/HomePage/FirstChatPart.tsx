import { Typography, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { setChatAreastepper } from "../../redux/slice/stepper";
import { io, Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  setcurrentUserSocketId,
  setonlineUsers,
  setsoket,
} from "../../redux/slice/chatstepper";

// URL of your WebSocket server
const SOCKET_SERVER_URL = "http://localhost:8080";

const FirstChatPart = () => {
  //TODO:- Panding Search bar
  //TODO:- get whose are online from contacts
  const dispatch = useDispatch();

  //socket logic
  // const [socket, setSocket] = useState<Socket | null>(null);
  // const [message, setMessage] = useState<string>("");
  // const [toUserId, setToUserId] = useState<string>("");

  const usernumber = useSelector((state: any) => state.user.userNumber);
  const onlineUsers = useSelector((state: any) => state.chat.onlineUsers);
  console.log("onlineUsers", onlineUsers); 

  // useEffect(() => {
  //   if (!usernumber) return; // Ensure usernumber is available before connecting

  //   const newSocket = io(SOCKET_SERVER_URL);

  //   if (!newSocket) return;
  //   dispatch(setsoket(newSocket));

  //   newSocket.emit("register", { userId: usernumber });

  //   // Set up listeners
  //   newSocket.on("userList", (users) => {
  //     dispatch(setonlineUsers(users));
  //   });

  //   return () => {
  //     newSocket.disconnect();
  //   };
  // }, [usernumber, dispatch]); // Only reconnect when usernumber changes

  //filter logged in user from onlineuser list
  const filterdOnlineUsers = Object.keys(onlineUsers).filter(
    (userId) => userId !== usernumber
  );

  return (
    <Box
      sx={{
        height: "100%",
        backgroundColor: "#51344F",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          width: "30%",
          zIndex: 1,
          backgroundColor: "#51344F", // Ensure the background is consistent
          padding: "1rem",
        }}
      >
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </Box>
      {/* first show only those are online by clicking it make chat communication */}
      <Box
        sx={{
          marginTop: "65px", // Adjust for the height of the fixed search bar
          overflowY: "auto",
          padding: "1rem",
          flex: 1, // Ensures this section takes the remaining height
        }}
      >
        {filterdOnlineUsers.map((userId) => (
          <Box
            //onclick show send chat and set current user socketid
            onClick={() => (
              dispatch(setChatAreastepper(true)),
              dispatch(setcurrentUserSocketId(userId))
            )}
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              marginBottom: "1rem",
              cursor: "pointer",
            }}
          >
            <Box>
              <div className="avatar online h-10 w-10">
                <div className="w-24 rounded-full">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
            </Box>
            <Box>
              <Typography>{userId}</Typography>
              <Typography>Hey! How are you?</Typography>
            </Box>
          </Box>
        ))}
        {/* {Array(19)
          .fill("Box")
          .map((_, index) => (
            <Box
              key={index}
              //onclick show send chat section
              onClick={() => dispatch(setChatAreastepper(true))}
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                marginBottom: "1rem",
                cursor: "pointer",
              }}
            >
              <Box>
                <div className="avatar online h-10 w-10">
                  <div className="w-24 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
              </Box>
              <Box>
                <Typography>John Doe</Typography>
                <Typography>Hey! How are you?</Typography>
              </Box>
            </Box>
          ))} */}
      </Box>
    </Box>
  );
};

export default FirstChatPart;
