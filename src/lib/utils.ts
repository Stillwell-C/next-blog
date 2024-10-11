export const postContentToArray = (content: string) =>
  content
    .toString()
    .split("\n")
    .filter((el) => el.trim());

export const formatDate = (date: Date) => {
  return new Date(date).toLocaleString("sv-SE", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
