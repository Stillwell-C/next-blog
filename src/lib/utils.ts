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
