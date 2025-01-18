import { Typography, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { setChatAreastepper } from "../../redux/slice/stepper";

const FirstChatPart = () => {
const dispatch = useDispatch();
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
        {Array(19)
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
          ))}
      </Box>
    </Box>
  );
};

export default FirstChatPart;
