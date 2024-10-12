import ProfileImage from "./ProfileImage";

type Props = {
  comment: CommentType;
};

const PostCommentCard = ({ comment }: Props) => {
  return (
    <div className='flex items-center gap-4'>
      <div>
        <ProfileImage imgUrl={comment?.author?.imgUrl} />
      </div>
      <div className='flex flex-col'>
        <span className='text-sm'>{comment.author.username}</span>
        <span>{comment.content}</span>
      </div>
    </div>
  );
};

export default PostCommentCard;
