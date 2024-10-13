type CredentialsLoginType = {
  username: string;
  password: string;
};

interface FormStateType {
  error?: boolean;
  errorMsg?: string;
  success?: boolean;
}

interface RegisterFormStateType extends FormStateType {
  username?: string;
  password?: string;
  passwordConfirmation?: string;
}

interface PostFormStateType {
  title: string;
  subTitle?: string;
  content: string;
  authorId: string;
  imgUrl?: string | null;
}

type QueriedPostType =
  | ({
      author: {
        username: string;
      };
      editor?: {
        username: string;
      } | null;
    } & {
      id: string;
      imgUrl: string | null;
      title: string;
      subTitle: string | null;
      content: string;
      authorId: string;
      createdAt: Date;
      updatedAt: Date;
      editorId: string | null;
    })
  | null;

type FindManyPostType =
  | ({
      author: {
        username: string;
      };
    } & {
      id: string;
      imgUrl: string | null;
      title: string;
      subTitle: string | null;
      content?: string;
      authorId: string;
      createdAt: Date;
      updatedAt: Date;
      editorId: string | null;
    })
  | null;

type PostDataReturnType = {
  posts: FindManyPostType[];
  currentPage: number;
  totalCount: number;
  totalPages: number;
};

type CommentType = {
  postId: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  authorId: string;
  author: { username: string; imgUrl: string | null };
};
