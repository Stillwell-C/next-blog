"use client";

import { useRef, useState } from "react";
import ProfileImage from "./ProfileImage";
import { updateUserImg } from "@/lib/actions";
import { useFormState } from "react-dom";
import FormStateError from "./FormStateError";
import FormStatusSpinner from "./FormStatusSpinner";

type Props = {
  imgUrl?: string | null;
  userId: string;
};

const ProfileForm = ({ imgUrl: existingImgUrl, userId }: Props) => {
  const [imgUrl, setImgUrl] = useState(existingImgUrl || "");

  const formButtonRef = useRef<HTMLButtonElement>(null);

  const [state, formAction] = useFormState(updateUserImg, null);

  const updateImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImgUrl(URL.createObjectURL(e.target.files[0]));

      if (formButtonRef?.current) {
        formButtonRef.current.click();
      }
    }
  };

  return (
    <form className='flex flex-col gap-4' action={formAction}>
      <div className='flex gap-12 items-center mt-4'>
        <div>
          <ProfileImage size={50} imgUrl={imgUrl} />
        </div>
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
            onChange={updateImage}
            hidden
          />
        </div>
        <div className='min-w-11'>
          <FormStatusSpinner />
        </div>
      </div>
      <FormStateError formState={state} />
      <input type='text' name='userId' value={userId} hidden readOnly />
      <button ref={formButtonRef} type='submit' hidden></button>
    </form>
  );
};

export default ProfileForm;
