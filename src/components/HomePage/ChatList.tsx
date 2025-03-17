import { Box } from "@mui/material";
import { FixedSizeList as List } from "react-window";
import { useRef, useEffect } from "react";

const ChatList = ({ filteredMessages }: { filteredMessages: any[] }) => {
  const listRef = useRef<List>(null);

  // Auto-scroll to the bottom when filteredMessages changes
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToItem(filteredMessages.length - 1, "end");
    }
  }, [filteredMessages]);
  // Row renderer for the List component
  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const msg = filteredMessages[index];

    const formattedTime = new Date(msg.Created_At).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return (
      <div style={style}>
        <Box
          key={index}
          className={`chat ${msg.fromSelf ? "chat-end" : "chat-start"}`}
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
            {/* Display receiver's name */}
            <time className="text-xs opacity-50">{formattedTime}</time>{" "}
            {/* Display formatted time */}
          </div>
          <div className="chat-bubble break-words whitespace-normal w-fit max-w-[75%] p-3">
            {msg.IsImage ? (
              <img
                className="w-40 h-40"
                alt="Chat Image"
                src={msg.message} // Render the image URL directly
              />
            ) : (
              msg?.message // Decrypt only text messages
            )}
          </div>
          <div className="chat-footer opacity-50">Delivered</div>
        </Box>
      </div>
    );
  };

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <List
        height={500} // Adjust based on your container height
        itemCount={filteredMessages.length}
        itemSize={200} // Adjust based on the height of each row
        width="100%" // Use 100% width or a fixed value
        ref={listRef}
      >
        {Row}
      </List>
      {/* <div ref={messagesEndRef} /> Scroll to the bottom */}
    </Box>
  );
};

export default ChatList;
