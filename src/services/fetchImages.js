import { loadImage } from "../utils/loadImage";

const fetchImages = (id) => {
  return window
    .fetch(`https://cameo-explorer.netlify.app/celebs/${id}.json`)
    .then(async (response) => {
      const data = await response.json();
      await loadImage(data.image);
      if (response.ok) {
        if (data) {
          return data;
        }
      } else {
        throw new Error("Response failed.");
      }
    });
};

export { fetchImages };
