"use client";

import { useEffect, useRef, useState } from "react";
import ProfileImage from "./ProfileImage";
import { useFormState } from "react-dom";
import FormStateError from "./FormStateError";
import FormStatusSpinner from "./FormStatusSpinner";
import { useSession } from "next-auth/react";
import { updateUserImg } from "@/lib/actions/userActions";

type Props = {
  imgUrl?: string | null;
  userId: string;
};

const ProfileForm = ({ imgUrl: existingImgUrl, userId }: Props) => {
  const { update } = useSession();

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

  const updateUserSession = async (imgUrl: string) => {
    await update({ imgUrl });
  };

  useEffect(() => {
    if (state?.success && state?.imgUrl) {
      updateUserSession(state.imgUrl);
    }
  }, [state]);

  return (
    <form className='flex flex-col gap-4' action={formAction}>
      <div className='flex gap-12 items-center mt-4'>
        <div>
          <ProfileImage size={50} imgUrl={imgUrl} />
        </div>
        <div>
          <label
            htmlFor='imageUpload'
            className='text-white bg-black dark:bg-slate-700 px-4 py-2 rounded cursor-pointer'
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
