"use client";
import { uploadFileToCloudinary } from "@/lib/cloudinaryUtils";
import React, { useState } from "react";

type Props = {
  setImgUrl: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

const ImageUploadForm = ({ setImgUrl, setLoading, setErrorMessage }: Props) => {
  //Send down loading state and props to pass img up

  const handleSetFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      try {
        setErrorMessage("");
        setLoading(true);
        const res = await uploadFileToCloudinary(e.target?.files[0]);
        if (!res.error && res.imgUrl) {
          setImgUrl(res.imgUrl);
        } else {
          setErrorMessage("에러가 발생했습니다. 다시 시도해 주세요");
        }
        setLoading(false);
      } catch (err) {
        setErrorMessage("에러가 발생했습니다. 다시 시도해 주세요");
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <label
        htmlFor='imageUpload'
        className='text-white bg-black px-4 py-2 rounded cursor-pointer'
      >
        파일 선택
      </label>
      <input
        id='imageUpload'
        type='file'
        accept='image/*'
        name='imageUpload'
        aria-label='image upload'
        onChange={handleSetFile}
        hidden
      />
    </div>
  );
};

export default ImageUploadForm;
