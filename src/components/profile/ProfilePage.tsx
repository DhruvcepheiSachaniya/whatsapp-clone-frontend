import { Box, CircularProgress } from "@mui/material";
import HeaderBar from "../HeaderBar";
import { Camera, Mail, User } from "lucide-react";
import { useEffect, useState } from "react";
import { GetProfileDataApi, HandleProfileImageUpload } from "../API/Profile";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "../../redux/slice/userslice";
import { RootState } from "../../redux/store/store";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state: RootState) => state.user.userProfile);
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Upload profile image
  const postProfileImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsImageLoading(true);

      const file = event.target.files?.[0];
      if (!file) {
        throw new Error("No file selected");
      }

      const profileImage: any = await HandleProfileImageUpload(file);

      // Update the user profile image in the Redux store
      dispatch(
        setUserProfile({
          ...userProfile,
          UserPhotoUrl: profileImage?.find_user?.UserPhotoUrl,
        })
      );
    } catch (err) {
      console.error("Failed to upload profile image:", err);
      setError("Failed to upload profile image");
    } finally {
      setIsImageLoading(false);
    }
  };

  // Fetch profile data
  const fetchProfileData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const profileData: any = await GetProfileDataApi();

      // Dispatch the action to update the Redux store
      dispatch(
        setUserProfile({
          UserName: profileData?.UserName,
          UserPhotoUrl: profileData?.UserPhotoUrl,
          MobileNumber: profileData?.MobileNumber,
          Email: profileData?.Email,
          Created_At: profileData?.Created_At,
        })
      );
    } catch (err) {
      console.error("Failed to fetch profile data:", err);
      setError("Failed to fetch profile data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Call the function on component mount
  useEffect(() => {
    fetchProfileData();
  }, [dispatch]); // Add `dispatch` to the dependency array (optional, as it's stable)

  //get member since from created at
  const MemberSince = userProfile?.Created_At
    ? new Date(userProfile.Created_At).getFullYear()
    : "N/A";

  return (
    <>
      {isLoading ? (
        <CircularProgress size={20} color="inherit" />
      ) : (
        <>
          <HeaderBar />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              height: "calc(100vh - 48px)", // Full height minus the header
              marginTop: "48px", // Match header height
              padding: "1rem", // Add padding to center content
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
                <h1 className="text-2xl font-semibold">Profile</h1>
                <p className="mt-2">Your profile information</p>
              </div>

              {/* Profile Image */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                {isImageLoading ? (
                  <CircularProgress size={20} color="inherit" /> 
                ) : (
                  <>
                  <img
                    src={userProfile?.UserPhotoUrl || "/avatar.png"}
                    alt="Profile"
                    className="size-32 rounded-full object-cover border-4"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200"
                  >
                    <Camera className="w-5 h-5 text-base-200" />
                    <input
                      type="file"
                      id="avatar-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={postProfileImage}
                      disabled={isImageLoading}
                    />
                  </label>
                  </>
                )}
                </div>
                <p className="text-sm text-zinc-400">
                  Click the camera icon to update your photo
                </p>
              </div>

              {/* User Details */}
              <div className="space-y-6">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <div className="text-sm text-zinc-400 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </div>
                  <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                    {userProfile?.UserName}
                  </p>
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <div className="text-sm text-zinc-400 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </div>
                  <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                    {userProfile?.Email}
                  </p>
                </div>
              </div>

              {/* Account Information */}
              <div className="mt-6 bg-base-300 rounded-xl p-6">
                <h2 className="text-lg font-medium mb-4">
                  Account Information
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                    <span>Member Since</span>
                    <span>{MemberSince}</span>
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
      )}
    </>
  );
};

export default ProfilePage;
