import Image from "next/image";
import { RxAvatar } from "react-icons/rx";

type Props = {
  comment: CommentType;
};

const PostCommentCard = ({ comment }: Props) => {
  const blankAvatar = <RxAvatar size={40} />;
  const generateAvatar = (url: string) => (
    <Image
      src={url}
      width={40}
      height={40}
      alt={`${comment.author.username} 프로필 사진`}
      className='rounded-full'
    ></Image>
  );

  const displayAvatar = comment?.author?.imgUrl
    ? generateAvatar(comment.author.imgUrl)
    : blankAvatar;

  return (
    <div className='flex items-center gap-4'>
      <div>{displayAvatar}</div>
      <div className='flex flex-col'>
        <span>{comment.author.username}</span>
        <span>{comment.content}</span>
      </div>
    </div>
  );
};

export default PostCommentCard;
