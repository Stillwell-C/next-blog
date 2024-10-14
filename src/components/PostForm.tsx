import { useEffect, useRef, useState } from "react";
import FormStateError from "./FormStateError";
import FormStatusButton from "./FormStatusSubmitButton";
import { CiImageOn } from "react-icons/ci";
import Image from "next/image";
import { FcCancel } from "react-icons/fc";

type Props = {
  authorId?: string;
  editorId?: string;
  post?: QueriedPostType | null;
  buttonText?: string;
  formAction: (payload: FormData) => void;
  formState: FormStateType | null;
};

const PostForm = ({
  authorId,
  editorId,
  post,
  buttonText,
  formAction,
  formState,
}: Props) => {
  const [imgUrl, setImgUrl] = useState(post?.imgUrl || "");
  const [existingImgUrl, setExistingImgUrl] = useState(post?.imgUrl || "");
  const [displayPurgeButton, setDisplayPurgeButton] = useState(false);

  const imgInputRef = useRef<HTMLInputElement>(null);

  const imgIcon = <CiImageOn size={200} />;
  const imgDisplay = (
    <Image
      src={imgUrl}
      width={200}
      height={150}
      alt='게시물 이미지'
      className='object-cover overflow-hidden border border-black rounded max-h-44'
    ></Image>
  );

  //새로 붙인 이미지 파일 나타냄
  const updateImageState = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImgUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const purgeImgFile = () => {
    //새로은 업로드 없고 기존 이미지 파일 경우
    if (
      imgInputRef?.current?.files &&
      imgInputRef?.current?.files?.length <= 0 &&
      existingImgUrl.length
    ) {
      setExistingImgUrl("");
      setImgUrl("");
    } else if (imgInputRef?.current) {
      //새로은 업로드 있음
      imgInputRef.current.value = "";

      //기존 이미지 파일 경우
      if (existingImgUrl.length) {
        setImgUrl(existingImgUrl);
      } else {
        setImgUrl("");
      }
    }
  };

  //이미지 삭제 버트 나타냄 여부
  useEffect(() => {
    if (
      existingImgUrl.length ||
      (imgInputRef?.current?.files && imgInputRef?.current?.files?.length > 0)
    ) {
      setDisplayPurgeButton(true);
    } else {
      setDisplayPurgeButton(false);
    }
  }, [existingImgUrl, imgInputRef]);

  return (
    <div>
      <form
        action={formAction}
        className='flex flex-col gap-4 px-8 max-w-3xl mx-auto'
      >
        <input type='text' name='authorId' value={authorId} hidden readOnly />
        <input type='text' name='editorId' value={editorId} hidden readOnly />
        <input type='text' name='postId' value={post?.id} hidden readOnly />
        <input
          type='text'
          name='existingImgUrl'
          hidden
          value={existingImgUrl}
          readOnly
        />
        <div className='flex gap-10 items-center'>
          <div>{imgUrl.length ? imgDisplay : imgIcon}</div>
          <div className='flex gap-4'>
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
              onChange={updateImageState}
              ref={imgInputRef}
              hidden
            />
            {displayPurgeButton && (
              <button
                type='button'
                onClick={purgeImgFile}
                aria-label='이미지 파일 삭제'
              >
                <FcCancel size={30} />
              </button>
            )}
          </div>
        </div>
        <div className='flex flex-col'>
          <label htmlFor='title' className='ml-2 text-xs'>
            제목:
          </label>
          <input
            type='text'
            placeholder='제목'
            id='title'
            name='title'
            defaultValue={post?.title}
            className='border border-black rounded-md p-4'
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='subTitle' className='ml-2 text-xs'>
            부제:
          </label>
          <input
            type='text'
            placeholder='부제'
            id='subTitle'
            defaultValue={post?.subTitle || ""}
            name='subTitle'
            className='border border-black rounded-md p-4'
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='content' className='ml-2 text-xs'>
            포스팅 내용:
          </label>
          <textarea
            placeholder='내용'
            id='content'
            name='content'
            defaultValue={post?.content.split("\n").join("\n\n")}
            className='border border-black rounded-md p-4 resize-y h-44'
          ></textarea>
        </div>
        <FormStatusButton buttonText={buttonText} />
        <FormStateError formState={formState} />
      </form>
    </div>
  );
};

export default PostForm;
