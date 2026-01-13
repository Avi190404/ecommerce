"use client";
import React, { useState } from "react";
import { imageUploadMutation } from "@/hooks/imageUploadMutation";

const imageUplaod = () => {
  const [preview, setPreview] = useState<string[]>([]);
  const { mutate, isPending, isError, error} = imageUploadMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      mutate(fileArray,{
        onSuccess: (links) => {
        console.log("Success! Save these to your DB:", links);
        },
        onError: (err) => {
            console.error("Upload failed:", err);
        }
      })
      const newPreviews = fileArray.map((file) => URL.createObjectURL(file));
      setPreview(newPreviews);
      console.log("Total files selected:", fileArray.length);
      console.log("File Data:", fileArray);
    }
  };
  return (
    <>
      <div>
        <input type="file" accept="image/*" multiple onChange={handleChange} />
      </div>
    </>
  );
};

export default imageUplaod;
