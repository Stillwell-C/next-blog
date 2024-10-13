import React from "react";
import ProfileImage from "./ProfileImage";

type Props = {
  subComment: SubCommentType;
};

const SubCommentCard = ({ subComment }: Props) => {
  return (
    <div className='flex items-start gap-4'>
      <div>
        <ProfileImage imgUrl={subComment?.author?.imgUrl} />
      </div>
      <div className='flex flex-col flex-1'>
        <span className='text-sm'>{subComment.author.username}</span>
        <span>{subComment.content}</span>
      </div>
    </div>
  );
};

export default SubCommentCard;
