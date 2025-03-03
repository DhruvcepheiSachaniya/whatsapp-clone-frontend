import axiosInstance from "../../networkCalls/axiosinstance";

export const GetProfileDataApi = async () => {
  try {
    const response = await axiosInstance.get("/user/me");

    return response;
  } catch (err: any) {
    console.log("error in getting profile data", err);
  }
};
