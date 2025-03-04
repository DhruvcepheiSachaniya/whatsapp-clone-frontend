import axiosInstance from "../../networkCalls/axiosinstance";

export const GetProfileDataApi = async () => {
  try {
    const response = await axiosInstance.get("/user/me");

    return response;
  } catch (err: any) {
    console.log("error in getting profile data", err);
  }
};

export const HandleProfileImageUpload = async (file: any) => {
  try {

    const formdata = new FormData();
    formdata.append("file", file);

    const response = await axiosInstance.post("/user/upload", formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (err: any) {
    console.log("error in setting image", err);
  }
}