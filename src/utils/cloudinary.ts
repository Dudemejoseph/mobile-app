import axiosInstance from "../config/axios_config";

export const cloudinaryUpload = async (photo: {
  uri: string;
  type: string;
  name: string;
  base64: string;
}): Promise<any> => {
  const base64Img = `data:image/${photo.type};base64,${photo.base64}`;
  const form = new FormData();
  form.append("file", base64Img);
  form.append("upload_preset", "farm-monitor-demo");

  const res = await fetch("https://api.cloudinary.com/v1_1/denvato/upload", {
    method: "post",
    body: form,
  });
  const response = await res.json();
  return response.secure_url;
};

export const uploadChi = async (data: { image_url: string; rating: number; farm_id: number }) => {
  console.log("data is ", data);
  await axiosInstance.post("/CHI", data);
};
