"use server";

import { signIn, signOut } from "@/app/lib/auth";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { CredentialsSignin } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";

export const handleGitHubLogin = async () => {
  await signIn("github");
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
    return { error: true, errorMsg: "Must inclue all fields" };
  }

  if (password !== passwordConfirmation) {
    return { error: true, errorMsg: "비밀번호 일치하지 않습니다" };
  }

  try {
    //TODO TEXT INSENSITIVE
    const user = await prisma.user.findFirst({
      where: { username: username as string },
    });

    if (user) {
      return { error: true, errorMsg: "중복 아이디가 확인되었습니다." };
    }

    //TODO: CHECK user credential length, etc.

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
    console.log(err);
    return { error: true, errorMsg: "Something went wrong." };
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
  const { username, password } = Object.fromEntries(formData);

  if (!username || !password) {
    return { error: true, errorMsg: "Please input username and password." };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username: username as string },
    });

    if (user === null) {
      return { error: true, errorMsg: "아이디가 존재하지 않습니다." };
    }

    const passwordCheck = await bcrypt.compare(
      password as string,
      user.password as string
    );

    if (!passwordCheck) {
      return { error: true, errorMsg: "아이디 또는 비밀번호가 맞지 않습니다" };
    }

    await signIn("credentials", { user });
    return { success: true };
  } catch (err) {
    console.log(err);
    //TODO FIGURE OUT CORRECT ERROR
    if (err instanceof CredentialsSignin) {
      return { error: true, errorMsg: "아이디 또는 비밀번호가 맞지 않습니다" };
    }
    if (isRedirectError(err)) {
      throw err;
    }
    return { error: true, errorMsg: "Something went wrong" };
  }
};
