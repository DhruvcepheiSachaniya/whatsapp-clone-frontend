import { Box, Typography } from "@mui/material";
import { MessageSquare } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useSocket } from "./socket";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axiosInstance from "../networkCalls/axiosinstance";
import CryptoJS from "crypto-js";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { RootState } from "../../redux/store/store";
import { getimagecloudurl } from "../API/Chat";
import { setcurrentImgPreviewUrl } from "../../redux/slice/chatstepper";
import { Message } from "./types";
import ChatList from "./ChatList";
import { decryptData } from "../../shared/components/security";
import { password } from "../../shared/components/security";

const options = ["None", "Atria", "Callisto", "Dione"];

const ITEM_HEIGHT = 48;

//For File Input
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const SecondChatPart = () => {
  const { socket } = useSocket();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState([]);

  const [filteredMessages, setFilteredMessages] = useState([]);

  const currentImgPreviewUrl = useSelector(
    (state: RootState) => state.chat.currentImgPreviewUrl
  );

  const chatareastepper = useSelector(
    (state: RootState) => state.stepper.chatAreastepper
  );
  const currentSocketId = useSelector(
    (state: RootState) => state.chat.currentUserSocketId
  ); // current reciver socket id

  const currentUserPhotoUrl = useSelector(
    (state: RootState) => state.chat.currentUserPhotoUrl
  ); // current reciver photo

  const currentUserUserName = useSelector(
    (state: RootState) => state.chat.currentUserUserName
  ); // current reciver username

  const userNumber = useSelector((state: RootState) => state.user.userNumber); // logged usernumber

  //for scrollbar down at the last message
  const messagesEndRef = useRef(null);

  // Scroll to the bottom when messages update or chat area opens
  useEffect(() => {
    if (messagesEndRef.current && chatareastepper) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [filteredMessages, chatareastepper]); // Trigger on message updates or chat area state change

  //for Menu Item
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Fetch chat history on select user
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response: any = await axiosInstance.get("chat/message", {
          params: { receiverNumber: currentSocketId },
        });

        // Process messages directly without decryption
        const processedMessages = response.get_messages
          .filter((msg: Message) => msg?.IsActive)
          .map((msg: any) => ({
            ...msg,
            message: decryptData(msg.message || msg.meassage, password), // ✅ Display "message" instead of "meassage"
            // message: msg?.meassage || msg.message, // ✅ Display "message" instead of "meassage"
            from_number: msg?.ownerId.MobileNumber, // Sender's number
            to_number: msg?.receiverId.MobileNumber, // Receiver's number
            fromSelf: msg?.ownerId.MobileNumber === userNumber, // Check if the logged-in user is the sender
          }));

        setMessages(processedMessages);
      } catch (error) {
        console.error("Failed to fetch messages", error);
      }
    };

    if (currentSocketId) {
      fetchMessage();
    }
  }, [currentSocketId, userNumber]);

  // Listen for incoming private messages
  useEffect(() => {
    if (!socket) {
      return;
    }

    // const messageHandler = (msg: string) => {
    //   setMessages((prevMessages) => [...prevMessages, msg]);
    // };
    const messageHandler = (newMessage: Message) => {
      setMessages((prevMessages: Message[]) => {
        const updatedMessages = [...prevMessages, newMessage];

        return updatedMessages;
      });
    };

    // socket.off("privateMessageReceived");
    socket.on("privateMessageReceived", messageHandler);

    return () => {
      socket.off("privateMessageReceived", messageHandler);
    };
  }, [socket, userNumber]);

  // Send a message
  const sendMessage = async () => {
    if (!socket) {
      return;
    }

    try {
      // Handle image message
      if (currentImgPreviewUrl !== null) {
        // Get the cloudinary URL for the image
        const cloudinaryUrl = await getimagecloudurl(currentImgPreviewUrl);

        // Send the image URL as a message and set IsImg to true
        const response = await axiosInstance.post("chat/meassage", {
          reciverNumber: currentSocketId,
          meassage: cloudinaryUrl, // Corrected typo
          IsImage: true,
        });

        // Create the message object for socket emit and state update
        const msg = {
          toUserId: currentSocketId,
          from_number: userNumber,
          to_number: currentSocketId,
          message: cloudinaryUrl, // Image URL
          IsImage: true, // Image message flag
          timestamp: Date.now(),
        };

        // Emit the message via socket
        socket.emit("privateMessage", msg);

        // Update local state with the new message
        setMessages((prevMessages) => [
          ...prevMessages,
          { ...msg, fromSelf: true },
        ]);

        // Clear the input field (image message doesn't need a text message reset)
        setMessage("");
        dispatch(setcurrentImgPreviewUrl(null)); // Clear the image preview
      } else if (message) {
        // If there's no image but a text message exists
        const response = await axiosInstance.post("chat/meassage", {
          // Corrected typo
          reciverNumber: currentSocketId,
          meassage: message,
        });

        const msg = {
          toUserId: currentSocketId,
          from_number: userNumber,
          to_number: currentSocketId,
          message,
          IsImage: false, // Text message flag
          timestamp: Date.now(),
        };

        // Emit the text message via socket
        socket.emit("privateMessage", msg);

        // Add the message to local state
        setMessages((prevMessages) => [
          ...prevMessages,
          { ...msg, fromSelf: true },
        ]);

        // Clear input field
        setMessage("");
      }
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  const getSender = (msg: Message) => {
    return msg.fromSelf ? msg.ownerId : msg.receiverId;
  };

  const getReceiver = (msg: Message) => {
    return msg.fromSelf ? msg.receiverId : msg.ownerId;
  };

  // Filter messages based on currentSocketId
  useEffect(() => {
    const updatedMessages = messages.filter(
      (msg: Message) =>
        (msg.from_number === userNumber && msg.to_number === currentSocketId) ||
        (msg.from_number === currentSocketId && msg.to_number === userNumber) ||
        (msg.from_number === userNumber && !msg.to_number) ||
        (msg.from_number === currentSocketId && !msg.to_number)
    );

    setFilteredMessages(updatedMessages);
  }, [messages, userNumber, currentSocketId]); // Runs whenever messages update

  console.log("filteredMessages", filteredMessages);
  const dispatch = useDispatch();

  // handing image upload
  const handleimageuploadchange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      dispatch(setcurrentImgPreviewUrl(file));
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
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              height: "100%",
              overflow: "hidden",
            }}
          >
            {/* chat area header */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: "10px",
                marginTop: "0.5rem",
                cursor: "pointer",
                borderBottom: "1px solid #70486d",
              }}
            >
              <Box sx={{ display: "flex", gap: "0.5rem" }}>
                <Box>
                  <div className="avatar h-10 w-10">
                    <div className="w-24 rounded-full">
                      <img
                        src={
                          currentUserPhotoUrl ||
                          "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        }
                      />
                    </div>
                  </div>
                </Box>
                <Box>
                  <Typography>{currentUserUserName}</Typography>
                  <Typography>online</Typography>
                </Box>
              </Box>
              <Box>
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
            </Box>
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                // padding: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {/* {filteredMessages.map((msg: Message, index: number) => {
                // Format the timestamp (e.g., "16:39" from "2025-03-12T16:39:24.973Z")
                const formattedTime = new Date(
                  msg.Created_At
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <Box
                    key={index}
                    className={`chat ${
                      msg.fromSelf ? "chat-end" : "chat-start"
                    }`}
                  >
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img
                          alt="Avatar"
                          // src={
                          //   msg.fromSelf
                          //     ? msg.ownerId.UserPhotoUrl ||
                          //       "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                          //     : msg.receiverId.UserPhotoUrl ||
                          //       "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                          // }
                          src={
                            msg.ownerId.UserPhotoUrl ||
                            "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                          }
                        />
                      </div>
                    </div>
                    <div className="chat-header">
                      {msg.fromSelf ? "You" : msg.ownerId.UserName}{" "}
                      <time className="text-xs opacity-50">
                        {formattedTime}
                      </time>{" "}
                    </div>
                    <div className="chat-bubble break-words whitespace-normal w-fit max-w-[75%] p-3">
                      {msg.IsImage ? (
                        <img
                          className="w-40 h-40"
                          alt="Chat Image"
                          src={msg.message} // Render the image URL directly
                        />
                      ) : (
                        decryptData(msg.message, password) // Decrypt only text messages
                      )}
                    </div>
                    <div className="chat-footer opacity-50">Delivered</div>
                  </Box>
                );
              })} */}
              <ChatList filteredMessages={filteredMessages} />
              {/* <div ref={messagesEndRef} /> Scroll to the bottom */}
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
              <Button
                component="label"
                role={undefined}
                // variant="outlined"
                tabIndex={-1}
                startIcon={<AddIcon sx={{ width: "30px", height: "30px" }} />}
              >
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleimageuploadchange}
                  // multiple
                />
              </Button>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={message}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button variant="contained" onClick={sendMessage}>
                Send
              </Button>
            </Box>
          </Box>
        </>
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
