import { cloudinary } from "@/cloudinary.config";

export const uploadFileToCloudinary = async (file: File | Blob) => {
  try {
    const form = new FormData();
    form.set("file", file);

    const res = await fetch("/api/cloudinary", {
      method: "POST",
      body: form,
    });

    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
    throw new Error();
  }
};

export const uploadFileToCloudinaryFromAction = async (file: File | Blob) => {
  try {
    const fileBuffer = await file.arrayBuffer();
    const mimeType = file.type;
    const encoding = "base64";
    const encodedData = Buffer.from(fileBuffer).toString("base64");

    const fileUri = `data:${mimeType};${encoding},${encodedData}`;

    const response = await uploadImage(fileUri);

    if (response.success && response.result) {
      return {
        message: "Image uploaded",
        error: false,
        imgUrl: response.result.secure_url,
      };
    } else {
      return { message: "Upload failed", error: true };
    }
  } catch (err) {
    return { message: "Upload failed", error: true };
  }
};

const uploadImage = async (fileUri: string) => {
  try {
    const result = await cloudinary.uploader.upload(fileUri, {
      invalidate: true,
      resource_type: "auto",
    });
    return { success: true, result };
  } catch (err) {
    return { success: false, err };
  }
};
