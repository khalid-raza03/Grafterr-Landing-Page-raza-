const MIN_DELAY = 800;
const MAX_DELAY = 1600;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const randomDelay = () => {
  const ms =
    Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1)) + MIN_DELAY;
  return delay(ms);
};

let cachedData = null;

const loadData = async () => {
  if (cachedData) return cachedData;

  const response = await import("../data/content.json");
  cachedData = response.default;
  return cachedData;
};

export const fetchHeroContent = async () => {
  await randomDelay();
  const data = await loadData();
  return { hero: data.hero };
};

export const fetchContFeatureContent = async () => {
  await randomDelay();
  const data = await loadData();
  return { featuresSection: data.featuresSection, carousel: data.carousel };
};

 export const fetchAll = async () => {
    await randomDelay();
    return loadData();   
};