import { error, log } from "console";
import { errorToJSON } from "next/dist/server/render";

export async function fetchTrending() {
  const API_KEY = "f2d2ea33f720a1491e82150391a0761f";
  const url =
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMmQyZWEzM2Y3MjBhMTQ5MWU4MjE1MDM5MWEwNzYxZiIsInN1YiI6IjY1MjE1OTAzYzFmZmJkMDBmZTEwY2NmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ncBgU4neaxkgS-8ZgXZOdP6--5nExdgAWnQKc1RsqIA",
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status : ${response.status}`);
    }
    const json = await response.json();
    // console.log(json);
    return json;
  } catch (error) {
    throw error;
  }
}
export async function getGenre() {
  const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMmQyZWEzM2Y3MjBhMTQ5MWU4MjE1MDM5MWEwNzYxZiIsInN1YiI6IjY1MjE1OTAzYzFmZmJkMDBmZTEwY2NmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ncBgU4neaxkgS-8ZgXZOdP6--5nExdgAWnQKc1RsqIA",
    },
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status " ${response.status}`);
    }
    const json = await response.json();
    // console.log(json);
    return json;
  } catch (error) {
    throw error;
  }
}

export async function searchFilms(query: string) {
  const base_url = "https://api.themoviedb.org/3/search/movie";
  const url = `${base_url}?query=${query}&include_adult=false&language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMmQyZWEzM2Y3MjBhMTQ5MWU4MjE1MDM5MWEwNzYxZiIsInN1YiI6IjY1MjE1OTAzYzFmZmJkMDBmZTEwY2NmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ncBgU4neaxkgS-8ZgXZOdP6--5nExdgAWnQKc1RsqIA",
    },
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status " ${response.status}`);
    }
    const json = await response.json();
    // console.log(json);
    return json;
  } catch (error) {
    throw error;
  }
}
export const footerLinks = [
  {
    title: "About",
    links: [
      { title: "How it works", url: "/" },
      { title: "Featured", url: "/" },
      { title: "Partnership", url: "/" },
      { title: "Bussiness Relation", url: "/" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "Events", url: "/" },
      { title: "Blog", url: "/" },
      { title: "Podcast", url: "/" },
      { title: "Invite a friend", url: "/" },
    ],
  },
  {
    title: "Socials",
    links: [
      { title: "Discord", url: "/" },
      { title: "Instagram", url: "/" },
      { title: "Twitter", url: "/" },
      { title: "Facebook", url: "/" },
    ],
  },
];

export async function getCast(movieID: number) {
  const url = `https://api.themoviedb.org/3/movie/${movieID}/credits?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMmQyZWEzM2Y3MjBhMTQ5MWU4MjE1MDM5MWEwNzYxZiIsInN1YiI6IjY1MjE1OTAzYzFmZmJkMDBmZTEwY2NmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ncBgU4neaxkgS-8ZgXZOdP6--5nExdgAWnQKc1RsqIA",
    },
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`"HTTP Error! Status", ${response.status}`);
    }
    const json = await response.json();
    // console.log(json);
    return json;
  } catch (error) {
    throw error;
  }
}
export async function upComing(){
  const url ='https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
  const options = {
    method: "GET",
    headers: {
      Accept: "Application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMmQyZWEzM2Y3MjBhMTQ5MWU4MjE1MDM5MWEwNzYxZiIsInN1YiI6IjY1MjE1OTAzYzFmZmJkMDBmZTEwY2NmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ncBgU4neaxkgS-8ZgXZOdP6--5nExdgAWnQKc1RsqIA"
    },
  }
  try{
    const response = await fetch(url, options)
    if(!response.ok) {
      throw new Error(`HTTP Error! Status, ${response.status}`)
    }
    const json = await response.json()
    // console.log("upcoming features", json)
    return json
  }
  catch(error){
    throw error
  }
}
