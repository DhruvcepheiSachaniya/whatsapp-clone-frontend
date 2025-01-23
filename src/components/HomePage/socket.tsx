import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import { setonlineUsers } from "../../redux/slice/chatstepper";

const SOCKET_SERVER_URL = "http://localhost:8080";

interface SocketContextProps {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextProps>({ socket: null });

// const onlineUsers = useSelector((state: any) => state.chat.onlineUsers);
export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const usernumber = useSelector((state: any) => state.user.userNumber);
  const dispatch = useDispatch(); // Import and use useDispatch hook

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL, { transports: ["websocket"] });
    console.log("Socket initialized:", newSocket);

    newSocket.emit("register", { userId: usernumber });

    setSocket(newSocket);

    newSocket.on("userList", (users) => {
      console.log(users);
      dispatch(setonlineUsers(users)); // Dispatch the action using useDispatch
    });

    return () => {
      console.log("Disconnecting socket...");
      newSocket.disconnect();
    };
  }, [usernumber, dispatch]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
