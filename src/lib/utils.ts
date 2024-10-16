export const formatPostContent = (content: string) =>
  content
    .toString()
    .split(/\r\n|\n/g)
    .filter((el) => el.trim())
    .join("\n");

export const formatDate = (date: Date) => {
  return new Date(date).toLocaleString("sv-SE", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const nextPageConfirmation = (currentPage = 0, totalPages = 0) => {
  if (!currentPage || !totalPages) return false;

  return totalPages > currentPage;
};

export const resizeImg = (url: string, width: number, height?: number) => {
  if (url.includes("res.cloudinary.com")) {
    const splitUrl = url.split("upload");
    const dimensions = height ? `w_${width},h_${height}` : `w_${width}`;
    return splitUrl.join(`upload/${dimensions}`);
  } else if (url.includes("nioxxawyqsujjzeptdan.supabase.co")) {
    const dimensions = height
      ? `width=${width}&height=${height}`
      : `width=${width}${width}`;
    return url + "?" + dimensions;
  }

  return url;
};

export const isImageFile = (file: File) => {
  return file.type.startsWith("image/");
};
