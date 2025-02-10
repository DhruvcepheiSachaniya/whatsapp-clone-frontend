import { Box, Button, Typography } from "@mui/material";
import { MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { useSocket } from "./socket";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import axiosInstance from "../networkCalls/axiosinstance";
import CryptoJS from "crypto-js";

const SecondChatPart = () => {
  //TODO1:- on send store message in database
  //TODO2:- message receive from db but via socekt

  const { socket } = useSocket();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<any>([]);

  const [filteredMessages, setFilteredMessages] = useState([]);

  const chatareastepper = useSelector(
    (state: any) => state.stepper.chatAreastepper
  );
  const currentSocketId = useSelector(
    (state: any) => state.chat.currentUserSocketId
  ); // current reciver socket id

  const userNumber = useSelector((state: any) => state.user.userNumber); // logged usernumber

  // Decryption function (same as backend)
const decryptData = (encryptedData: string, password: string): string => {
  const [salt, ivHex, encrypted] = encryptedData.split('|');
  if (!salt || !ivHex || !encrypted) {
      throw new Error('Invalid encrypted data');
  }
  const key = CryptoJS.PBKDF2(password, salt, {
      keySize: 192 / 32,
      iterations: 1,
  });
  const iv = CryptoJS.enc.Hex.parse(ivHex);
  const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};

// Example usage
const password = 'Password is used to generate key';

  // Fetch chat history on select user
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axiosInstance.get("chat/meassage", {
          params: { receiverNumber: currentSocketId },
        });

        // Process messages directly without decryption
        const processedMessages = response.get_messages
        .filter((msg: any) => msg.IsActive)
        
        
          .map((msg: any) => ({
            ...msg,
            // message: msg.meassage, // ✅ Display "message" instead of "meassage"
            message: decryptData(msg.meassage, password), // ✅ Display "message" instead of "meassage"
            from_number: msg.ownerId.MobileNumber, // Sender's number
            to_number: msg.receiverId.MobileNumber, // Receiver's number
            fromSelf: msg.ownerId.MobileNumber === userNumber, // Check if the logged-in user is the sender
          }));

        setMessages(processedMessages);
        // console.log("from fetch", processedMessages);
        // console.log("Processed Messages:", processedMessages);
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
      console.log("Socket instance not available yet.");
      return;
    }

    // const messageHandler = (msg: string) => {
    //   setMessages((prevMessages) => [...prevMessages, msg]);
    // };
    const messageHandler = (newMessage: any) => {
      console.log("🔴 Received Message:", newMessage); // Debugging

      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, newMessage];
        console.log("📩 Updated Messages:", updatedMessages); // Log updated list
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
    if (!socket || !message) {
      console.log("Socket or message is missing.");
      return;
    }

    try {
      //TODO:- store send message in db post chat/message
      const response = await axiosInstance.post("chat/meassage", {
        reciverNumber: currentSocketId,
        meassage: message,
      });

      const msg = {
        toUserId: currentSocketId,
        from_number: userNumber,
        to_number: currentSocketId,
        message,
        timestamp: Date.now(),
      };

      socket.emit("privateMessage", msg);

      // Add message to local state
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...msg, fromSelf: true },
      ]);
      setMessage(""); // Clear input field
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  // Filter messages based on currentSocketId
  useEffect(() => {
    const updatedMessages = messages.filter(
      (msg) =>
        (msg.from_number === userNumber && msg.to_number === currentSocketId) ||
        (msg.from_number === currentSocketId && msg.to_number === userNumber) ||
        (msg.from_number === userNumber && !msg.to_number) ||
        (msg.from_number === currentSocketId && !msg.to_number)
    );

    // console.log("Filtered Messages Updated:", updatedMessages); // Debugging log
    setFilteredMessages(updatedMessages);
  }, [messages, userNumber, currentSocketId]); // Runs whenever messages update

  // console.log("Filtered Messages:", filteredMessages);
  // console.log("messages list", messages);
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
          {/* chat area header */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              marginTop: "0.5rem",
              cursor: "pointer",
              borderBottom: "1px solid #70486d",
            }}
          >
            <Box>
              <div className="avatar h-10 w-10">
                <div className="w-24 rounded-full">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
            </Box>
            <Box>
              <Typography>{currentSocketId}</Typography>
              <Typography>online</Typography>
            </Box>
          </Box>
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
            {filteredMessages.map((msg, index) => (
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
                  {msg.fromSelf ? "You" : msg.from_number}
                  <time className="text-xs opacity-50">12:46</time>
                </div>
                <div className="chat-bubble break-words whitespace-normal w-fit max-w-[75%] p-3">
                  {msg.message}
                </div>
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
