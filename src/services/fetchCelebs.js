const URL = "https://cameo-explorer.netlify.app/celebs.json";

const createSetData = (data) => {
  const lookup = new Map();
  const subset = new Set();

  data.forEach((element) => {
    lookup.set(element.id, element);
  });

  data.forEach((element) => {
    if (element.reviews >= 50) {
      subset.add(element);
      element.similar.forEach((id) => {
        subset.add(lookup.get(id));
      });
    }
  });

  return {
    celebs: Array.from(subset),
    lookup,
  };
};

const fetchCelebs = () => {
  return window.fetch(URL).then(async (response) => {
    const data = await response.json();
    if (response.ok) {
      return createSetData(data);
    } else {
      throw new Error("Response failed");
    }
  });
};

export { fetchCelebs };
