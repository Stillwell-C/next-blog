import { nanoid } from "nanoid";
import { supabase } from "./supabase";

type SupabaseFolder = "POSTS" | "AVATARS";

export const uploadImageToSupabase = async (
  image: File,
  bucketFolder: SupabaseFolder
) => {
  const folder = bucketFolder === "POSTS" ? "posts" : "avatars";

  const fileId = nanoid();
  const fileType = image.name.split(".").pop();
  const uploadName = `${fileId}.${fileType}`;

  const { data, error } = await supabase.storage
    .from("images")
    .upload(`${folder}/${uploadName}`, image);

  if (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error - getUser: ", error.message);
    }

    return { error: true, message: error.message };
  } else {
    const { data: urlData } = supabase.storage
      .from("images")
      .getPublicUrl(data.path);

    return { imgUrl: urlData.publicUrl };
  }
};
