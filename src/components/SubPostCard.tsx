import React from "react";
import ProfileImage from "./ProfileImage";

type Props = {
  subPost: SubPostType;
};

const SubPostCard = ({ subPost }: Props) => {
  return (
    <div>
      {subPost?.content.split("\n").map((paragraph) => (
        <p className='mb-4' key={paragraph.slice(0, 15)}>
          {paragraph}
        </p>
      ))}
      <div className='flex items-center justify-end gap-4'>
        <div>{subPost.author.username}</div>
        <ProfileImage imgUrl={subPost.author.imgUrl} />
      </div>
    </div>
  );
};

export default SubPostCard;
