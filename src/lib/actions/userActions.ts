"use server";

import { uploadFileToCloudinaryFromAction } from "../cloudinaryUtils";
import { prisma } from "../prisma";
import { isImageFile } from "../utils";

export const getUser = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        username: true,
        imgUrl: true,
        updatedAt: true,
        createdAt: true,
        role: true,
      },
    });

    return user;
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error - getUser: ", err);
    }

    return null;
  }
};

export const updateUserImg = async (
  prevState: UpdateImgFormStateType | null,
  formData: FormData
) => {
  try {
    const { userId, imageUpload } = Object.fromEntries(formData);

    if (!userId || typeof userId !== "string") {
      return { error: true, errorMsg: "로그인 해주세요." };
    }

    const imageFormData = imageUpload as File;
    const imageCheck = isImageFile(imageFormData);

    if (!imageCheck) {
      return {
        error: true,
        errorMsg: "에로가 발생했습니다. 파일 형식은 이미지 파일이어야 합니다.",
      };
    }

    const res = await uploadFileToCloudinaryFromAction(imageFormData);

    if (!res.error && res.imgUrl) {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          imgUrl: res.imgUrl,
        },
      });
    } else {
      return { error: true, errorMsg: "이미지 업로드 에로가 발생했습니다" };
    }

    return { success: true, imgUrl: res.imgUrl };
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error - updateUserImg: ", err);
    }

    return { error: true, errorMsg: "이미지 업로드 에로가 발생했습니다" };
  }
};
