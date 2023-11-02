"use client";
import React, { useEffect, useState } from "react";
import "../styles/search.css";
import { SearchBar, Button, Footer } from ".";
import { searchFilms } from "@/utilis";
import Image from "next/image";
import imdb from "../public/imdb.png";
interface searchProp {
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

const Search = () => {
  const [searchMovie, setSearchMovie] = useState("");
  const [result, setResult] = useState<searchProp[]>([]);

  const handleSearchChange = (value: string) => {
    setSearchMovie(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await searchFilms(searchMovie);
        // console.log("showing results for", data);
        setResult(data.results);
      } catch (error) {
        throw error;
      }
    };
    fetchData();
  }, [searchMovie]);
  const slicedSearch = result.slice(0, 8);

  return (
    <>
      <div className="search-wrapper">
        <div className="search_header">
          <div className="ref">
            <h2 className="search-header__header">
              Got a particular movie in mind?
            </h2>
            <p className="ref-p">
              Search through our library and get tickets to watch your favorite
              movies
            </p>
          </div>

          <div className="contain-btn">
            <SearchBar onSearchChange={handleSearchChange} />
          </div>
        </div>
        <div className="search_body">
          {searchMovie === "" ? (
            <div className="no-result">
              <h1>Search for your favourite movies</h1>
            </div>
          ) : (
            <div className="result">
              {slicedSearch.map((movie) => (
                <div className="card" key={movie.id}>
                  <div className="card-img">
                    <Image
                      src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      fill={true}
                      alt={movie.title}
                    />
                  </div>
                  <div className="card-details search-details">
                    <h3 className="card-title search-title">
                      {movie.original_title}
                    </h3>
                    <div className="search-rating-container">
                      <div className="imdb-fill">
                        <Image
                          src={imdb}
                          fill={true}
                          alt="icon"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={true}
                        />
                      </div>
                      <h6>:</h6>
                      <p className="card-date search-average">
                        {movie.vote_average}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
