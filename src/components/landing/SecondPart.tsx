import React, { useEffect } from "react";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setSignupstepper,
  setForgetPasswordstepper,
  setVerifyOtpstepper,
  setSecurityCodestepper,
  setAllowChangePassword,
} from "../../redux/slice/stepper";
import axiosInstance from "../networkCalls/axiosinstance";
import toast from "react-hot-toast";
import { setToken, setuserNumber } from "../../redux/slice/userslice";
import OTP from "../OtpInput";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

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
  const navigate = useNavigate();
  const signupstepper = useSelector((state) => state.stepper.Signupstepper);

  const forgetPasswordstepper = useSelector(
    (state) => state.stepper.ForgetPasswordstepper
  );

  const verifyOtpstepper = useSelector(
    (state) => state.stepper.VerifyOtpstepper
  );

  const securityCodestepper = useSelector(
    (state) => state.stepper.SecurityCodestepper
  );

  const allowChangePassword = useSelector(
    (state) => state.stepper.AllowChangePassword
  );

  //Signup Loader
  const [isLoader, setLoader] = React.useState(false);

  // Timer state
  const seconds = verifyOtpstepper ? 120 : 300; // if forgetpasswordstepper then 5 minutes timer else 2 minutes
  const [timer, setTimer] = React.useState(seconds); // 5 minutes timer

  // Timer effect
  useEffect(() => {
    if (verifyOtpstepper && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (securityCodestepper && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [verifyOtpstepper, securityCodestepper, timer, seconds]);

  // Otp state
  const [otp, setOtp] = React.useState("");

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
          setLoader(true);
          const response = await axiosInstance.post("/auth/user/signup", {
            MobileNumber: state.MobileNumber,
            UserName: state.Username,
            Password: state.Password,
            Email: state.Email,
          });

          if (response.status === 201) {
            dispatch(setSignupstepper(false)); // Redirect to login after signup
            toast.success("Verify Otp sent to your email!");
            dispatch(setVerifyOtpstepper(true));
            //emplty every field here
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Something went wrong.");
        } finally {
          setLoader(false); //for signup button
          formDispatch({ type: "SET_FIELD", field: "MobileNumber", value: "" });
          formDispatch({ type: "SET_FIELD", field: "Username", value: "" });
          formDispatch({ type: "SET_FIELD", field: "Password", value: "" });
          formDispatch({ type: "SET_FIELD", field: "Email", value: "" });
        }
      } else if (forgetPasswordstepper) {
        // Forget Password API
        setLoader(true);
        try {
          const response = await axiosInstance.post("/user/password", {
            RegEmail: state.Email,
          });

          if (response.status === 200) {
            //handle after forget password
            //TODO:- first send security code ---> verify security code ---> allow change password
            toast.success("Security Code hase Sent you Email!");
            dispatch(setSecurityCodestepper(true));
            dispatch(setForgetPasswordstepper(false));
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Something went wrong.");
        } finally {
          setLoader(false); //for forget password button
        }
      } else if (verifyOtpstepper) {
        // Verify OTP API
        try {
          setLoader(true);
          const response = await axiosInstance.post("/auth/varify", {
            email: state.Email,
            otp: Number(otp),
          });

          if (response.status === 201) {
            toast.success("OTP verified! can login now");
            dispatch(setVerifyOtpstepper(false)); // Redirect to login
            // empty every field empty here
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Something went wrong.");
        } finally {
          setLoader(false); //for verify otp button
        }
      } else if (securityCodestepper) {
        try {
          setLoader(true);
          const response = await axiosInstance.post("/user/varify", {
            RegEmail: state.Email,
            code: state.SecurityCode,
          });

          if (response.status === 200) {
            toast.success("Security Code verified! can reset password now");
            dispatch(setSecurityCodestepper(false));
            dispatch(setAllowChangePassword(true));
            //TODO:- LET user reset password
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Something went wrong.");
        } finally {
          setLoader(false); //for security code button
        }
      } else if (allowChangePassword) {
        try {
          setLoader(true);
          const response = await axiosInstance.post("/user/changepassword", {
            RegEmail: state.Email,
            newPass: state.NewPassword,
            confirmPass: state.ConfirmPassword,
          });

          if (response.status === 200) {
            toast.success("Password changed successfully!");
            dispatch(setAllowChangePassword(false));
            dispatch(setForgetPasswordstepper(false));
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Something went wrong.");
        } finally {
          setLoader(false); //for change password button
        }
      } else {
        // Login API
        setLoader(true);
        const response = await axiosInstance.post("/auth/user", {
          MobileNumber: state.MobileNumber,
          Password: state.Password,
        });

        if (response.status === 201) {
          console.log("login response", response);
          dispatch(setToken(response.data.token));
          dispatch(setuserNumber(state.MobileNumber));
          toast.success("Login successful!");

          // Redirect to dashboard
          navigate("/homepage");

          // Handle socket here
          // const socket = io("http://localhost:8080");

          // socket.on("connect", () => {
          //   const socketId = socket.id;
          //   console.log("Connected with socket ID:", socketId);
          // });

          // socket.on("disconnect", () => {
          //   console.log("Socket disconnected");
          // });
        }
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoader(false); //for login button
      formDispatch({ type: "SET_FIELD", field: "MobileNumber", value: "" });
      formDispatch({ type: "SET_FIELD", field: "Password", value: "" });
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
        {verifyOtpstepper ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <InputLabel sx={{ color: "#b1ae59" }}>Enter OTP</InputLabel>
            <OTP
              separator={<span>-</span>}
              value={otp}
              onChange={setOtp}
              length={6}
            />
          </Box>
        ) : (
          <Box>
            {(signupstepper ||
              (!forgetPasswordstepper &&
                !securityCodestepper &&
                !allowChangePassword)) && (
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
            {(signupstepper ||
              (!forgetPasswordstepper &&
                !securityCodestepper &&
                !allowChangePassword)) && (
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
            {securityCodestepper && (
              <>
                <InputLabel sx={{ color: "#b1ae59" }}>Security code</InputLabel>
                <TextField
                  name="SecurityCode"
                  value={state.SecurityCode}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ width: "20rem", mb: 2 }}
                />
              </>
            )}
            {allowChangePassword && (
              <>
                <InputLabel sx={{ color: "#b1ae59" }}>New Password</InputLabel>
                <TextField
                  name="NewPassword"
                  value={state.NewPassword}
                  onChange={handleChange}
                  type="password"
                  variant="outlined"
                  sx={{ width: "20rem", mb: 2 }}
                />
              </>
            )}
            {allowChangePassword && (
              <>
                <InputLabel sx={{ color: "#b1ae59" }}>
                  Confirm Password
                </InputLabel>
                <TextField
                  name="ConfirmPassword"
                  value={state.ConfirmPassword}
                  onChange={handleChange}
                  type="password"
                  variant="outlined"
                  sx={{ width: "20rem", mb: 2 }}
                />
              </>
            )}
          </Box>
        )}
      </Box>

      {verifyOtpstepper && (
        <Box sx={{ mt: 2 }}>
          <Typography sx={{ color: "#FFD700" }}>
            OTP Expire in: {Math.floor(timer / 60)}:
            {("0" + (timer % 60)).slice(-2)}
          </Typography>
        </Box>
      )}

      {securityCodestepper && (
        <Box sx={{ mt: 2 }}>
          <Typography sx={{ color: "#FFD700" }}>
            Security Code will expire in: {Math.floor(timer / 60)}:
            {("0" + (timer % 60)).slice(-2)}
          </Typography>
        </Box>
      )}

      {/* Submit Button */}
      <Button
        sx={{
          width: "20rem",
          backgroundColor: "#b1ae59",
        }}
        variant="contained"
        onClick={handleSubmit}
      >
        {isLoader ? (
          <CircularProgress size={20} color="inherit" />
        ) : (
          <>
            {signupstepper
              ? "Signup"
              : forgetPasswordstepper
              ? "Reset Password"
              : verifyOtpstepper
              ? "Verify OTP"
              : securityCodestepper
              ? "Verify Security Code"
              : allowChangePassword
              ? "Change Password"
              : "Login"}{" "}
          </>
        )}
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
