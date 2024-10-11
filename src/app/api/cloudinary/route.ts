import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDAPIKEY,
  api_secret: process.env.CLOUDINARYSECRET,
  secure: true,
});

export const POST = async (req: Request) => {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signatureResponse = cloudinary.utils.api_sign_request(
      { timestamp },
      cloudinaryConfig.api_secret as string
    );

    // Make this in file
    let imgData;
    // const imgData = new FormData();
    // imgData.append("file", imageFile);
    // imgData.append("api_key", api_key);
    // imgData.append("signature", signatureResponse.data.signature);
    // imgData.append("timestamp", signatureResponse.data.timestamp);

    const cloudinaryRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}/auto/upload`,
      {
        //Stringify?
        body: imgData,
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    const cloudinaryJson = await cloudinaryRes.json();

    return NextResponse.json({
      public_id: cloudinaryJson.data.public_id,
      version: cloudinaryJson.data.version,
      signature: cloudinaryJson.data.signature,
      format: cloudinaryJson.data.format,
    });
  } catch (err) {
    console.log(err);
  }
};
