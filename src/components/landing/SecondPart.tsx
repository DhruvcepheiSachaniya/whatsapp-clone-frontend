import React from "react";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { MessageSquare } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../redux/slice/userslice";
import { setSignupstepper } from "../../redux/slice/stepper";
import axiosInstance from "../networkCalls/axiosinstance";

const initialState = {
  MobileNumber: "",
  Password: "",
  Username: "",
  Email: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
};

const SecondPart: React.FC = () => {
  const [state, formDispatch] = React.useReducer(reducer, initialState);
  const dispatch = useDispatch();
  const signupstepper = useSelector((state) => state.stepper.Signupstepper);

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formDispatch({
      type: "SET_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const endpoint =
        signupstepper === false ? "/auth/user" : "/auth/user/signup";
      const response = await axiosInstance.post(endpoint, state);

      if (response.status === 200) {
        if (response.data.token) {
          dispatch(setToken(response.data.token));
        }
        toast.success(signupstepper ? "Signup Successful" : "Login Successful");
      }
    } catch (error: any) {
      toast.success(
        error.response.data.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <Box
      sx={{
        width: "100%", // Full width of parent container (50% of the screen)
        height: "100%", // Full height of parent container
        backgroundColor: "#664163",
        display: "flex", // Center content
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#FFFFFF",
        gap: 1,
      }}
    >
      {/* Message Icon with Background */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#b1ae59", // Light background for icon
          borderRadius: "8px", // Rounded rectangle
          padding: "4px 8px", // Padding for the rectangle
        }}
      >
        <MessageSquare size={20} color="#70486d" />
      </Box>
      <Typography
        variant="h5"
        sx={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 600,
          color: "#FFD700", // Gold color
          marginBottom: 1,
        }}
      >
        Welcome Back 😊
      </Typography>
      {signupstepper === false ? (
        <Typography
          sx={{
            fontFamily: "'Roboto', sans-serif",
            fontSize: "16px",
            color: "#E0E0E0", // Light grey
            lineHeight: 1.5,
          }}
        >
          Signin to your account
        </Typography>
      ) : (
        <Typography
          sx={{
            fontFamily: "'Roboto', sans-serif",
            fontSize: "16px",
            color: "#E0E0E0", // Light grey
            lineHeight: 1.5,
          }}
        >
          {" "}
          signup to your account
        </Typography>
      )}

      {signupstepper === true && (
        <Box>
          <InputLabel
            sx={{
              color: "#b1ae59",
            }}
          >
            Username
          </InputLabel>
          <TextField
            name="Username"
            typeof="text"
            value={state.Username}
            onChange={handlechange}
            variant="outlined"
            sx={{
              width: "20rem",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "gray", // Default border color
                },
                "&:hover fieldset": {
                  borderColor: "#FFD700", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#FFD700", // Border color when focused
                },
              },
            }}
          />
        </Box>
      )}

      <Box>
        <InputLabel
          sx={{
            color: "#b1ae59",
          }}
        >
          Mobile Number
        </InputLabel>
        <TextField
          name="MobileNumber"
          type="tel"
          value={state.MobileNumber}
          onChange={handlechange}
          variant="outlined"
          sx={{
            width: "20rem",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "gray", // Default border color
              },
              "&:hover fieldset": {
                borderColor: "#FFD700", // Border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#FFD700", // Border color when focused
              },
            },
          }}
        />
      </Box>

      {signupstepper === true && (
        <Box>
          <InputLabel
            sx={{
              color: "#b1ae59",
            }}
          >
            Email
          </InputLabel>
          <TextField
            name="Email"
            type="email"
            value={state.Email}
            onChange={handlechange}
            variant="outlined"
            sx={{
              width: "20rem",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "gray", // Default border color
                },
                "&:hover fieldset": {
                  borderColor: "#FFD700", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#FFD700", // Border color when focused
                },
              },
            }}
          />
        </Box>
      )}

      <Box>
        <InputLabel
          sx={{
            color: "#b1ae59",
          }}
        >
          Password
        </InputLabel>
        <TextField
          value={state.Password}
          name="Password"
          type="password"
          onChange={handlechange}
          variant="outlined"
          sx={{
            width: "20rem",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "gray", // Default border color
              },
              "&:hover fieldset": {
                borderColor: "#FFD700", // Border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#FFD700", // Border color when focused
              },
            },
          }}
        />
      </Box>

      <Box>
        <Button
          sx={{
            width: "20rem",
            backgroundColor: "#b1ae59",
          }}
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
      {signupstepper === false && (
        <Typography
          sx={{
            fontFamily: "'Poppins', sans-serif",
            // color: "#FFD700",
          }}
        >
          Didn't have an account?{" "}
          <Typography
            onClick={() => dispatch(setSignupstepper(true))}
            sx={{
              fontFamily: "'poppins', sans-serif",
              color: "#FFD700",
              cursor: "pointer",
            }}
          >
            Register
          </Typography>
        </Typography>
      )}
      <Typography
        sx={{
          fontFamily: "'Poppins', sans-serif",
          color: "#FFD700",
          cursor: "pointer",
        }}
      >
        Forget Password?
      </Typography>
    </Box>
  );
};

export default SecondPart;
