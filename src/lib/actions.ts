"use server";

import { signIn, signOut } from "@/lib/auth";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { CredentialsSignin } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";

//AUTH ACTIONS

export const handleGitHubLogin = async (formData: FormData) => {
  const { redirectUrl } = Object.fromEntries(formData);

  const redirectLink = redirectUrl?.toString()?.length
    ? redirectUrl.toString()
    : "/";

  //CallbackURL 현재 next-auth 버전에서 문제가 있음
  await signIn("github", { callbackUrl: redirectLink });
};

export const handleLogout = async () => {
  await signOut();
};

/**
 * Register a new user
 * @param {RegisterFormStateType} prevState
 * @param {username: string, email: string, password: string, passwordConfirmation: string} formData
 * @returns {FormStateType}
 */
export const registerUser = async (
  prevState: RegisterFormStateType | null,
  formData: FormData
) => {
  const { username, password, passwordConfirmation } =
    Object.fromEntries(formData);

  if (!username || !password || !passwordConfirmation) {
    return { error: true, errorMsg: "모든 입력란을 작성해야 합니다." };
  }

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    typeof passwordConfirmation !== "string"
  ) {
    return { error: true, errorMsg: "비정상적인 데이터가 전달되었습니다." };
  }

  if (password !== passwordConfirmation) {
    return { error: true, errorMsg: "비밀번호 일치하지 않습니다" };
  }

  if (password.length < 8 || password.length > 50) {
    return {
      error: true,
      errorMsg: "비밀번호는 8자에서 50자 사이여야 합니다.",
    };
  }

  if (username.length < 4 || username.length > 30) {
    return {
      error: true,
      errorMsg: "사용자 아이디는 4자에서 30자 사이여야 합니다.",
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
    });

    if (user) {
      return { error: true, errorMsg: "중복 아이디가 확인되었습니다." };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password as string, salt);

    await prisma.user.create({
      data: {
        username: username as string,
        password: hashedPassword,
      },
    });

    return { success: true };
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error - registerUser: ", err);
    }

    return { error: true, errorMsg: "문제가 발생했습니다." };
  }
};

/**
 * Sign in user with username and password
 * @param {FormStateType} prevState
 * @param {username: string, password: string} formData
 * @returns {FormStateType}
 */
export const credentialsLogin = async (
  prevState: FormStateType | null,
  formData: FormData
) => {
  const { username, password, redirectUrl } = Object.fromEntries(formData);

  if (!username || !password) {
    return {
      error: true,
      errorMsg: "아이디와 비밀번호를 모두 입력해야 합니다.",
    };
  }

  if (typeof username !== "string" || typeof password !== "string") {
    return { error: true, errorMsg: "비정상적인 데이터가 전달되었습니다." };
  }

  const redirectLink = redirectUrl?.toString()?.length ? redirectUrl : "/";

  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
    });

    if (user === null) {
      return { error: true, errorMsg: "아이디가 존재하지 않습니다." };
    }

    const passwordCheck = await bcrypt.compare(
      password,
      user.password as string
    );

    if (!passwordCheck) {
      return { error: true, errorMsg: "아이디 또는 비밀번호가 맞지 않습니다" };
    }

    await signIn("credentials", {
      redirectTo: redirectLink as string,
      ...user,
    });
    return { success: true };
  } catch (err) {
    if (err instanceof CredentialsSignin) {
      return { error: true, errorMsg: "아이디 또는 비밀번호가 맞지 않습니다" };
    }
    //로그인 문제 발생하지 않아도 패키지 작동 때문에 NEXT_REDIRECT 에로가 로그인 당시에 발생해서 여기 처리됨.
    if (isRedirectError(err)) {
      throw err;
    }

    if (process.env.NODE_ENV !== "production") {
      console.error("Error - credentialsLogin: ", err);
    }

    return { error: true, errorMsg: "문제가 발생했습니다." };
  }
};
