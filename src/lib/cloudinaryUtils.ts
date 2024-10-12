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
    throw new Error();
  }
};
