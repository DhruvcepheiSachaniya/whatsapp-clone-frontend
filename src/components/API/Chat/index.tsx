import toast from "react-hot-toast";
import axiosInstance from "../../networkCalls/axiosinstance";

export const getimagecloudurl = async (file: any) => {
  try {
    console.log("from chat", file);
    const formdata = new FormData();
    formdata.append("file", file);

    const response = await axiosInstance.post("/user/imgurl", formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (err) {
    toast.error("error in getting image url");
  }
};
