export const postContentToArray = (content: string) =>
  content
    .toString()
    .split("\n")
    .filter((el) => el.trim());
