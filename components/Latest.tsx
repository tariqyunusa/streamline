"use client";
import React, { useEffect, useState } from "react";
import "../styles/Latest.css";
import { fetchTrending } from "@/utilis";
import Image from "next/image";
interface fetch {
  adult: boolean;
  backdrop_path: string;
  genre_ids: object;
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
  const [fetch, setFetch] = useState<fetch[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTrending();
        setFetch(data.results);
        console.log(data);
      } catch (error) {
        console.error("Failed To Fetch Data", error);
      }
    };
    fetchData();
  }, []);
  const limitedFetch = fetch.slice(0, 8);
  return (
    <>
      <div className="latest-wrapper">
        <h1 className="header_latest">Opening This Week</h1>

        <div className="cards">
          {limitedFetch.map((item) => (
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
      </div>
    </>
  );
};

export default Latest;
