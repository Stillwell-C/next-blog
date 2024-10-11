import FormStateError from "./FormStateError";
import FormStatusButton from "./FormStatusSubmitButton";

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
  //TODO: MAKE SURE WORKS FINE WITH DEFAULT VALUE & NO STATE FOR INPUTS

  return (
    <form
      action={formAction}
      className='flex flex-col gap-4 px-8 max-w-3xl mx-auto'
    >
      <input type='text' name='authorId' value={authorId} hidden readOnly />
      <input type='text' name='editorId' value={editorId} hidden readOnly />
      <input type='text' name='postId' value={post?.id} hidden readOnly />
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
          defaultValue={post?.content?.join("\n\n")}
          className='border border-black rounded-md p-4 resize-y h-44'
        ></textarea>
      </div>
      <FormStatusButton buttonText={buttonText} />
      <FormStateError formState={formState} />
    </form>
  );
};

export default PostForm;
