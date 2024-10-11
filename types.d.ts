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
  content: string[];
  authorId: string;
}

type QueriedPostType = {
  authorId: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  subTitle: string | null;
  content: string[];
  imgUrl: string | null;
  editorId: string | null;
  editor?: { username: string };
  author?: { username: string };
};

type CommentType = {
  postId: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  authorId: string;
  author: { username: string };
};
