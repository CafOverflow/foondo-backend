require('dotenv').config();
const flatCache = require('flat-cache');
const memoryCache = require('memory-cache');
const unirest = require('unirest');

const rapidApiKey = process.env.X_RAPIDAPI_KEY;

const env = process.env.NODE_ENV || 'development';

async function fetchUnirest(path, query) {
  let requestString = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/';
  requestString += `${path}?${query}`;

  console.log('');
  console.log(`${new Date().toISOString()} Fetched from ${requestString}`);
  console.log('');
  return unirest
    .get(requestString)
    .header('X-RapidAPI-Key', rapidApiKey);
}

function getCache(cacheKey) {
  if (env === 'production') {
    return memoryCache.get(cacheKey);
  }
  const cache = flatCache.load(`${env}_cache`, `./${env}/api_cache`);
  return cache.getKey(cacheKey);
}

function setCache(cacheKey, response) {
  if (env === 'production') {
    // cache for 10 minutes
    memoryCache.put(cacheKey, response, 10 * 60 * 1000);
  }
  const cache = flatCache.load(`${env}_cache`, `./${env}/api_cache`);
  cache.setKey(cacheKey, response);
  cache.save(true);
}

async function get(path, query) {
  const cacheKey = `__express_spoonacular_${path}?${query}`;
  let response = getCache(cacheKey);

  if (!response) {
    const { body, status } = await fetchUnirest(path, query);
    response = { body, status };
    setCache(cacheKey, response);
  }
  return response;
}

module.exports = {
  get,
};
