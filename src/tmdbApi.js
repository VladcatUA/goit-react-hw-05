import axios from "axios";

/*const url =
  "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1";*/

const URL_trending =
  "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
const API_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjdiZjFhMjBhZDg4OTc5ZTZhZDY1YTZmNTAzMGE5ZCIsIm5iZiI6MTc0MjU4MjUxMi4zODksInN1YiI6IjY3ZGRiMmYwMjk5MjM3ODQ5MzdhN2YwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sJSuZGYW-7LNQk6bAKDLWjrdzVJnaXLV2sB166rKPC4";
const BASE_URL = "https://api.themoviedb.org/3/";

const options = {
  headers: {
    Authorization: `${API_TOKEN}`,
    Accept: "application/json",
  },
};

export default async function fetchDataTrending() {
  try {
    const { data } = await axios.get(URL_trending, options);
    return data;
  } catch (error) {
    console.error("Помилка запиту:", error);
  }
}

export async function fetchDataWithSearch(query, page) {
  try {
    const URL_SearchAPI = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`;
    const { data } = await axios.get(URL_SearchAPI, options);
    return data;
  } catch (error) {
    console.log(`URL_SearchAPI error ${error} `);
    return null;
  }
}

const URL_details =
  "https://api.themoviedb.org/3/movie/movie_id?language=en-US";
export async function fetchDataDetails(id) {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    options
  );

  return data;
}

const URL_credits =
  "https://api.themoviedb.org/3/movie/movie_id/credits?language=en-US";

export async function fetchDataCredits(id) {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
      options
    );

    return data;
  } catch (error) {
    console.log(`error in js credits- ${error}`);
  }
}

const URL_reviews =
  "https://api.themoviedb.org/3/movie/movie_id/reviews?language=en-US&page=1";
export async function fetchReviews(id) {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`,
      options
    );

    return data;
  } catch (error) {
    console.log(`error reviews -${error}`);
  }
}