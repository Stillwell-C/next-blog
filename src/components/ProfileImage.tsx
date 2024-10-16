import { resizeImg } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { RxAvatar } from "react-icons/rx";

type Props = {
  imgUrl?: string | null;
  size?: number;
};

const ProfileImage = ({ imgUrl, size = 40 }: Props) => {
  if (!imgUrl?.length || imgUrl === null || imgUrl === "null") {
    return <RxAvatar size={size} />;
  } else {
    const resizedImg = resizeImg(imgUrl, 50);

    return (
      <Image
        src={resizedImg}
        width={size}
        height={size}
        alt={`프로필 사진`}
        className='rounded-full aspect-square object-cover overflow-hidden border border-black dark:bg-slate-700'
      ></Image>
    );
  }
};

export default ProfileImage;
