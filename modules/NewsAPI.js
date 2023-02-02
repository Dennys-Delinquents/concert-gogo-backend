'use strict';

// *** REQUIRES
const axios = require('axios');

// ******** Global Variables

async function NewsAPI(request, response, next) {
  try {
    // Get info from API
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}&category=entertainment`;
    console.log(url);

    let newsData = await axios.get(url);
    newsData = newsData.data.articles;
    response.status(200).send(newsData);

  } catch (error) {
    response.status(401).send('error');
    return next(error);
  }
}

module.exports = NewsAPI;
