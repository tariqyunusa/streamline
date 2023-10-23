// Latest.js
"use client";
import React, { useEffect, useState } from "react";
import "../styles/Latest.css";
import { fetchTrending, getGenre } from "@/utilis";
import Image from "next/image";
import { Dropdown } from ".";

interface FetchItem {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface Genre {
  id: number;
  name: string;
}

const Latest = () => {
  const [fetchData, setFetchData] = useState<FetchItem[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await fetchTrending();
        setFetchData(movies.results);
      } catch (error) {
        console.error("Failed to fetch movies", error);
      }
    };

    const fetchGenres = async () => {
      try {
        const genreData = await getGenre();
        setGenres(genreData.genres);
      } catch (error) {
        console.error("Failed to fetch genres", error);
      }
    };

    fetchMovies();
    fetchGenres();
  }, []);

  const limitedMovies = fetchData.slice(0, 8);

  const handleDropdownChange = (selectedValue: number) => {
    setSelectedGenre(selectedValue);
  };

  const filteredMovies = selectedGenre
    ? fetchData.filter((item) => item.genre_ids.includes(selectedGenre))
    : limitedMovies;
  const slicedFilterededMovies = filteredMovies.slice(0, 8);

  return (
    <>
      <div className="latest-wrapper">
        <div className="header-wrapper">
          <h1 className="latest_header">Opening This Week</h1>
          <div className="filters">
            <Dropdown onChange={handleDropdownChange} />
          </div>
        </div>

        {selectedGenre !== null && selectedGenre !== undefined ? (
          <div className="cards">
            {slicedFilterededMovies.map((item) => (
              <div className="card" key={item.id}>
                <div className="card-img">
                  <Image
                    src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                    fill={true}
                    alt={item.title}
                  />
                </div>
                <div className="card-details">
                  <h3 className="card-title">{item.original_title}</h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No movies for the selected Genre this week.</p>
        )}
      </div>
    </>
  );
};

export default Latest;
