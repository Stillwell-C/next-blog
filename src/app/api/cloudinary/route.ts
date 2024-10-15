import { cloudinary } from "@/cloudinary.config";
import { NextRequest, NextResponse } from "next/server";

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

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    const fileBuffer = await file.arrayBuffer();
    const mimeType = file.type;
    const encoding = "base64";
    const encodedData = Buffer.from(fileBuffer).toString("base64");

    const fileUri = `data:${mimeType};${encoding},${encodedData}`;

    const response = await uploadImage(fileUri);

    if (response.success && response.result) {
      return NextResponse.json({
        message: "Image uploaded",
        error: false,
        imgUrl: response.result.secure_url,
      });
    } else {
      return NextResponse.json({ message: "Upload failed", error: true });
    }
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error - API - Cloudinary/route: ", err);
    }
  }
};
