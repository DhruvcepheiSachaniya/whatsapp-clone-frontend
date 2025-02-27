import { Box } from "@mui/material";
import HeaderBar from "../HeaderBar";
import { Camera, Mail, User } from "lucide-react";
import { useState } from "react";
import axiosInstance from "../networkCalls/axiosinstance";

const ProfilePage = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async () => {
    try {
      const resposne = await axiosInstance.post("/user/profile", {
        file: "",
      });
    } catch (err: any) {
      console.log("error in image upload", err);
    }
  };
  return (
    <>
      <HeaderBar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          height: "calc(100vh - 48px)", // Full height minus the header
          marginTop: "48px", // Match header height
          padding: "1rem", //to make look like center
        }}
      >
        <Box
          sx={{
            alignItems: "center",
            width: "80%",
            padding: "12px",
            backgroundColor: "#51344F",
          }}
        >
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>
          {/* Show image in circle */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  //   onChange={handleImageUpload}
                  //   disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              Click the camera icon to update your photo
            </p>
          </div>
          {/* Show Full name */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">email</p>
            </div>
            {/* Show Email and phone number */}
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">email</p>
            </div>
          </div>
          {/* Account Info and status : Active or NotActive */}
          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>2025</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default ProfilePage;
