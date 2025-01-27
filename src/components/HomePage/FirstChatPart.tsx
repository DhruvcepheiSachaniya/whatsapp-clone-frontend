import { Typography, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { setChatAreastepper } from "../../redux/slice/stepper";
// import { io, Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
  setcurrentUserSocketId,
  // setonlineUsers,
  // setsoket,
} from "../../redux/slice/chatstepper";
import axiosInstance from "../networkCalls/axiosinstance";
import { setcontactList } from "../../redux/slice/userslice";
import toast from "react-hot-toast";

// URL of your WebSocket server
// const SOCKET_SERVER_URL = "http://localhost:8080";

const FirstChatPart = () => {
  //TODO:- Panding Search Filter rows

  //redux variables
  const usernumber = useSelector((state: any) => state.user.userNumber); // logged usernumber
  const onlineUsers = useSelector((state: any) => state.chat.onlineUsers); // online users list from soket
  const contactList = useSelector((state: any) => state.user.contactList); // user contacts list from API

  const dispatch = useDispatch();

  //call user/details api and get user contacts and show them in chat list
  useEffect(() => {
    async function fetchContactList() {
      try {
        const response = await axiosInstance.get(
          `user/details?MobileNumber=${usernumber}`
        );

        //get user contacts list form backend
        const chatcontacts = response.chatcontacts || [];

        //set it to the redux store
        dispatch(setcontactList(chatcontacts));
      } catch (error: any) {
        toast.error("Error fetching contact list:", error);
      }
    }

    fetchContactList();
  }, [usernumber, dispatch]);

  //socket logic
  // const [socket, setSocket] = useState<Socket | null>(null);
  // const [message, setMessage] = useState<string>("");
  // const [toUserId, setToUserId] = useState<string>("");
  // console.log("onlineUsers", onlineUsers);

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

  // Extract online user MobileNumbers, excluding the logged-in user
  const onlineUserNumbers = Object.keys(onlineUsers).filter(
    (number) => number !== usernumber
  );

  // Filter contacts, excluding the current user
  const onlineContacts = contactList.filter((contact: any) =>
    onlineUserNumbers.includes(contact.MobileNumber)
  );

  const offlineContacts = contactList.filter(
    (contact: any) =>
      !onlineUserNumbers.includes(contact.MobileNumber) &&
      contact.MobileNumber !== usernumber
  );

  // Combine lists with online users first
  const sortedContacts = [...onlineContacts, ...offlineContacts];

  //NOTE:- this is the old logic
  // const filterdOnlineUsers = Object.keys(contactList).filter(
  //   (userId) => userId !== usernumber
  // );

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
          width: "28%",
          zIndex: 1,
          backgroundColor: "#51344F",
          padding: "1rem",
        }}
      >
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search By Number" />
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
      {/* get user which are in the contacts */}
      <Box
        sx={{
          marginTop: "65px",
          overflowY: "auto",
          padding: "1rem",
          flex: 1,
        }}
      >
        {sortedContacts.map((contact: any, index: number) => (
          <Box
            //onclick show send chat and set current user socketid
            onClick={() => (
              dispatch(setChatAreastepper(true)),
              dispatch(setcurrentUserSocketId(contact.MobileNumber))
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
              <div
                className={`avatar h-10 w-10 ${
                  onlineUserNumbers.includes(contact.MobileNumber)
                    ? "online"
                    : ""
                }`}
              >
                <div className="w-24 rounded-full">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
            </Box>
            <Box>
              <Typography>{contact.UserName}</Typography>
              <Typography>
                {onlineUserNumbers.includes(contact.MobileNumber)
                  ? "Hey! I'm online"
                  : "Last seen recently"}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FirstChatPart;
