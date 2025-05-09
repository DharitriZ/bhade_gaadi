import { ipURL } from "../api";

export const getImageUrl = (url: string) => {
    if (!url) return null;
    return url.replace('http://localhost:3001', ipURL);
};