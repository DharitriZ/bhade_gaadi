import { baseURl } from "../api";

export const getImageUrl = (url: string) => {
  if (!url) return null;
  return url.replace("http://localhost:3001", baseURl);
};
