import { Typography } from "@mui/material";
import { Box } from "@mui/material";

const FirstChatPart = () => {
  return (
    <>
      <Box
        sx={{
          height: "100%",
          backgroundColor: "#51344F",
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            position: "fixed",
            width: "fit-content",
            zIndex: 1,
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            position: "relative",
            zIndex: 0,
            overflowY: "auto",
            top: "50px",
          }}
        >
          {/* contact person */}
          {Array(19)
            .fill("Box")
            .map((_, index) => (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
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
    </>
  );
};

export default FirstChatPart;
