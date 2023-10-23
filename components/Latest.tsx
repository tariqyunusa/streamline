"use client";
import React, { useEffect, useState } from "react";
import "../styles/Latest.css";
import { fetchTrending } from "@/utilis";
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

const Latest = () => {
  const [fetchData, setFetchData] = useState<FetchItem[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTrending();
        setFetchData(data.results);
      } catch (error) {
        console.error("Failed To Fetch Data", error);
      }
    };
    fetchData();
  }, []);

  const limitedFetch = fetchData.slice(0, 8);

  const handleDropdownChange = (selectedValue: number) => {
    setSelectedGenre(selectedValue);
  };

  const filteredMovies = selectedGenre
    ? fetchData.filter((item) => item.genre_ids.includes(selectedGenre))
    : limitedFetch;

  return (
    <>
      <div className="latest-wrapper">
        <div className="header-wrapper">
          <h1 className="latest_header">Opening This Week</h1>
          <div className="filters">
            <Dropdown onChange={handleDropdownChange} />
          </div>
        </div>

        <div className="cards">
          {filteredMovies.map((item) => (
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

        {selectedGenre && (
          <div className="selected-genre">Selected Genre: {selectedGenre}</div>
        )}
      </div>
    </>
  );
};

export default Latest;
