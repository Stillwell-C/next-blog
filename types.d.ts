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
