export async function fetchTrending() {
  const url =
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
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
