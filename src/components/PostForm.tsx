import FormStateError from "./FormStateError";
import FormStatusButton from "./FormStatusSubmitButton";

type Props = {
  title?: string;
  subTitle?: string;
  content?: string;
  authorId: string;
  buttonText?: string;
  formAction: (payload: FormData) => void;
  formState: FormStateType | null;
};

const PostForm = ({
  title,
  subTitle,
  content,
  authorId,
  buttonText,
  formAction,
  formState,
}: Props) => {
  return (
    <form
      action={formAction}
      className='flex flex-col gap-4 px-8 max-w-3xl mx-auto'
    >
      <input type='text' name='authorId' value={authorId} hidden />
      <div className='flex flex-col'>
        <label htmlFor='title' className='ml-2 text-xs'>
          제목:
        </label>
        <input
          type='text'
          placeholder='제목'
          id='title'
          name='title'
          value={title}
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
          name='subTitle'
          value={subTitle}
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
          value={content}
          className='border border-black rounded-md p-4 resize-y h-44'
        ></textarea>
      </div>
      <FormStatusButton buttonText={buttonText} />
      <FormStateError formState={formState} />
    </form>
  );
};

export default PostForm;
