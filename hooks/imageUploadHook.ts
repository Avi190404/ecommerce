import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { array } from "zod";

export const imageUploadHook = () => {
  return useMutation({
    mutationFn: async (files: FileList) => {
      const { data: signData } = await axios.get("/api/upload-sign");
      const { sign, timestamp } = signData;
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("signature", sign);
        formData.append("timestamp", timestamp.toString());
        formData.append("folder", "Product");
        formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);

        const { data } = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
        );

        return data.secure_url;
      });

      return await Promise.all(uploadPromises);
    },
  });
};
