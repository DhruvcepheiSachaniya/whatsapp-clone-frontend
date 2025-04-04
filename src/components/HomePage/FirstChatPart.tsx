import {
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  styled,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setChatAreastepper } from "../../redux/slice/stepper";
// import { io, Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  setcurrentUserPhotoUrl,
  setcurrentUserSocketId,
  setcurrentUserUserName,
  // setonlineUsers,
  // setsoket,
} from "../../redux/slice/chatstepper";
import axiosInstance from "../networkCalls/axiosinstance";
import { setcontactList } from "../../redux/slice/userslice";
import toast from "react-hot-toast";
import { RootState } from "../../redux/store/store";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// URL of your WebSocket server
// const SOCKET_SERVER_URL = "http://localhost:8080";

//for menu item
const options = ["Add Contacts", "Create Group", "Logout"];

const ITEM_HEIGHT = 48;

const FirstChatPart = () => {
  //redux variables
  const usernumber = useSelector((state: RootState) => state.user.userNumber); // logged usernumber
  const onlineUsers = useSelector((state: RootState) => state.chat.onlineUsers); // online users list from soket
  const contactList = useSelector((state: RootState) => state.user.contactList); // user contacts list from API

  //current Selecet User for Chat
  const currentSocketId = useSelector(
    (state: any) => state.chat.currentUserSocketId
  );

  //Search filter
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  //call user/details api and get user contacts and show them in chat list
  useEffect(() => {
    async function fetchContactList() {
      try {
        const response: any = await axiosInstance.get(
          `user/details?MobileNumber=${usernumber}`
        );

        //get user contacts list form backend
        const chatcontacts = response.chatcontacts || [];

        //set it to the redux store
        dispatch(setcontactList(chatcontacts));
      } catch (error: any) {
        console.error("Error fetching contact list:", error);
      }
    }

    fetchContactList();
  }, [usernumber, dispatch]);

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

  // search value based on user number and username
  const searchFilter = sortedContacts.filter((contact: any) => {
    return (
      contact.MobileNumber.includes(search) ||
      contact.UserName.toLowerCase().includes(search.toLowerCase())
    );
  });

  // final contact filter
  const FinalContactFilter =
    searchFilter.length > 0 ? searchFilter : sortedContacts;

  //for Menu Item
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          position: "fixed",
          width: "30%",
          zIndex: 1,
          backgroundColor: "#51344F",
          padding: "1rem",
        }}
      >
        <Box width={"100%"}>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Search By Number"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
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
        <Box>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              paper: {
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                  background: "#51344F",
                  color: "white",
                },
              },
            }}
          >
            {options.map((option) => (
              <MenuItem
                key={option}
                selected={option === "Pyxis"}
                onClick={handleClose}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>
      {/* get user which are in the contacts */}
      <Box
        sx={{
          marginTop: "65px",
          overflowY: "auto",
          // padding: "1rem",
          paddingTop: "1rem",
          flex: 1,
        }}
      >
        {FinalContactFilter.length === 0 || searchFilter.length === 0 ? (
          <>
            <Box>
              <Typography sx={{ textAlign: "center", color: "white" }}>
                No Contact Found
              </Typography>
            </Box>
          </>
        ) : (
          FinalContactFilter.map((contact: any, index: number) => (
            <>
              <Box
                //onclick show send chat and set current user socketid
                key={index}
                onClick={() => (
                  dispatch(setChatAreastepper(true)),
                  dispatch(setcurrentUserSocketId(contact.MobileNumber)),
                  dispatch(setcurrentUserPhotoUrl(contact.UserPhotoUrl)),
                  dispatch(setcurrentUserUserName(contact.UserName))
                )}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  padding: "3px 5px 0px 5px",
                  // marginBottom: "1rem",
                  cursor: "pointer",
                  ":hover": {
                    backgroundColor: "#4a2c3d",
                  },
                  backgroundColor:
                    currentSocketId === contact.MobileNumber
                      ? "#4a2c3d"
                      : "#51344F",
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
                      <img
                        src={
                          contact?.UserPhotoUrl ||
                          "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        }
                      />
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
              {/* Line between user */}
              <Box
                height={"0.5px"}
                className=" bg-gray-300"
                style={{ marginBottom: "0.8rem" }}
              ></Box>
            </>
          ))
        )}
      </Box>
    </Box>
  );
};

export default FirstChatPart;
