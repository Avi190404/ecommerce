import { useMutation } from "@tanstack/react-query";
import axios from "axios"

export const imageUploadMutation = () => {
  return useMutation({
    mutationFn: async (files: File[]) => {
      const {data: signData} = await axios.get("/api/upload-sign")
      const { sign, timestamp } = signData;
      const uplaodPromis = files.map(async (file) => {
        const formData = new FormData()
        formData.append("file", file);
        formData.append("signature", sign);
        formData.append("timestamp", timestamp.toString());
        formData.append("folder", "Product");
        formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);

        const response = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,formData)

        return response.data.secure_url
      })
      return await Promise.all(uplaodPromis)
    },
    onSuccess: (urls) => {
      console.log("Array Of Link: ", urls)
    },
    onError: (err) => {
      console.error("One or more uploads failed", err);
    }
  })
}