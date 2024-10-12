"use client";

import { User } from "next-auth";
import { useEffect, useState } from "react";
import ProfileImage from "./ProfileImage";
import ImageUploadForm from "./ImageUploadForm";
import FormStatusButton from "./FormStatusSubmitButton";
import { updateUserImg } from "@/lib/actions";
import { ClipLoader } from "react-spinners";

type Props = {
  imgUrl?: string | null;
  userId: string;
};

const ProfileForm = ({ imgUrl, userId }: Props) => {
  const [displayImgUrl, setDisplayImgUrl] = useState(imgUrl);
  const [newImgUrl, setNewImgUrl] = useState("");
  const [imgLoading, setImgLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [imgErrorMsg, setImgErrorMsg] = useState("");

  const displayLoadingSpinner = imgLoading || updateLoading;

  useEffect(() => {
    const handleImgUpdate = async () => {
      try {
        await updateUserImg(newImgUrl, userId);
        setUpdateLoading(false);
      } catch (err) {
        setUpdateLoading(false);
      }
    };

    if (newImgUrl.length) {
      setUpdateLoading(true);
      setDisplayImgUrl(newImgUrl);
      handleImgUpdate();
    }
  }, [newImgUrl]);

  return (
    <form className='flex gap-12 items-center mt-4'>
      <div>
        <ProfileImage size={50} imgUrl={displayImgUrl} />
      </div>
      <div>
        <ImageUploadForm
          setImgUrl={setNewImgUrl}
          setLoading={setImgLoading}
          setErrorMessage={setImgErrorMsg}
        />
        {imgErrorMsg && <p>{imgErrorMsg}</p>}
      </div>
      <div className='min-w-11'>
        {displayLoadingSpinner && <ClipLoader size={35} />}
      </div>
    </form>
  );
};

export default ProfileForm;
