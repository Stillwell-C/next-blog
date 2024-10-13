import ProfileImage from "./ProfileImage";
import SubCommentList from "./SubCommentList";

type Props = {
  comment: CommentType;
};

const PostCommentCard = ({ comment }: Props) => {
  return (
    <div className='flex items-start gap-4'>
      <div>
        <ProfileImage imgUrl={comment?.author?.imgUrl} />
      </div>
      <div className='flex flex-col flex-1'>
        <span className='text-sm'>{comment.author.username}</span>
        <span>{comment.content}</span>
        <SubCommentList comment={comment} />
      </div>
    </div>
  );
};

export default PostCommentCard;
