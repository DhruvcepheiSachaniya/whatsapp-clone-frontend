import React from "react";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setSignupstepper,
  setForgetPasswordstepper,
} from "../../redux/slice/stepper";
import axiosInstance from "../networkCalls/axiosinstance";
import toast from "react-hot-toast";
import { setToken } from "../../redux/slice/userslice";

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
  const forgetPasswordstepper = useSelector(
    (state) => state.stepper.ForgetPasswordstepper
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formDispatch({
      type: "SET_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (signupstepper) {
        // Signup API
        try {
          const response = await axiosInstance.post("/auth/user/signup", {
            MobileNumber: state.MobileNumber,
            UserName: state.Username,
            Password: state.Password,
            Email: state.Email,
          });
          console.log(response);
          if (response.status === 201) {
            // dispatch(setSignupstepper(false)); // Redirect to login after signup
            toast.success("Verify Otp sent to your email!");
            //TODO: handle otp thing here and add loader in button
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Something went wrong.");
        }
      } else if (forgetPasswordstepper) {
        // Forget Password API
        const response = await axiosInstance.get("/user/password", {
          data: {
            RegEmail: state.Email,
          },
        });

        if (response.status === 200) {
          dispatch(setForgetPasswordstepper(false)); // Redirect to login
          toast.success("Password reset email sent!");
          //handle otp thing here
        }
      } else {
        // Login API
        const response = await axiosInstance.post("/auth/user", {
          MobileNumber: state.MobileNumber,
          Password: state.Password,
        });

        if (response.status === 200) {
          dispatch(setToken(response.data.token));
          toast.success("Login successful!");
          // Redirect to dashboard
        }
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#FFFFFF",
        gap: 2,
        backgroundColor: "#664163",
      }}
    >
      {signupstepper ? (
        <Typography variant="h5" sx={{ color: "#FFD700" }}>
          Signup to your account
        </Typography>
      ) : forgetPasswordstepper ? (
        <Typography variant="h5" sx={{ color: "#FFD700" }}>
          Forget Password
        </Typography>
      ) : (
        <Typography variant="h5" sx={{ color: "#FFD700" }}>
          Sign in to your account
        </Typography>
      )}

      {/* Form Fields */}
      <Box>
        {(signupstepper || !forgetPasswordstepper) && (
          <>
            <InputLabel sx={{ color: "#b1ae59" }}>Mobile Number</InputLabel>
            <TextField
              name="MobileNumber"
              value={state.MobileNumber}
              onChange={handleChange}
              variant="outlined"
              sx={{ width: "20rem", mb: 2 }}
            />
          </>
        )}
        {signupstepper && (
          <>
            <InputLabel sx={{ color: "#b1ae59" }}>Username</InputLabel>
            <TextField
              name="Username"
              value={state.Username}
              onChange={handleChange}
              variant="outlined"
              sx={{ width: "20rem", mb: 2 }}
            />
          </>
        )}
        {(signupstepper || forgetPasswordstepper) && (
          <>
            <InputLabel sx={{ color: "#b1ae59" }}>Email</InputLabel>
            <TextField
              name="Email"
              value={state.Email}
              onChange={handleChange}
              variant="outlined"
              sx={{ width: "20rem", mb: 2 }}
            />
          </>
        )}
        {(signupstepper || !forgetPasswordstepper) && (
          <>
            <InputLabel sx={{ color: "#b1ae59" }}>Password</InputLabel>
            <TextField
              name="Password"
              value={state.Password}
              onChange={handleChange}
              type="password"
              variant="outlined"
              sx={{ width: "20rem", mb: 2 }}
            />
          </>
        )}
      </Box>

      {/* Submit Button */}
      <Button
        sx={{
          width: "20rem",
          backgroundColor: "#b1ae59",
        }}
        variant="contained"
        onClick={handleSubmit}
      >
        {signupstepper
          ? "Signup"
          : forgetPasswordstepper
          ? "Reset Password"
          : "Login"}
      </Button>

      {/* Navigation Links */}
      <Box sx={{ mt: 2 }}>
        {!signupstepper && !forgetPasswordstepper && (
          <>
            <Typography
              onClick={() => dispatch(setSignupstepper(true))}
              sx={{
                color: "#FFD700",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Don't have an account? Register
            </Typography>
            <Typography
              onClick={() => dispatch(setForgetPasswordstepper(true))}
              sx={{
                color: "#FFD700",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Forgot Password?
            </Typography>
          </>
        )}
        {signupstepper && (
          <Typography
            onClick={() => dispatch(setSignupstepper(false))}
            sx={{
              color: "#FFD700",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Already have an account? Login
          </Typography>
        )}
        {forgetPasswordstepper && (
          <Typography
            onClick={() => dispatch(setForgetPasswordstepper(false))}
            sx={{
              color: "#FFD700",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Back to Login
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default SecondPart;
