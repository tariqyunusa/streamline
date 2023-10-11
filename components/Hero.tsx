"use client";
import { fetchTrending } from "@/utilis";
import React, { useEffect, useState } from "react";
import Image from "next/image";
interface movie {
  id: number;
  title: string;
  poster_path: string;
}

const Hero = () => {
  const [trending, SetTrending] = useState<movie[]>([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  // pull data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTrending();
        // console.log("Fetched Data:", data);
        SetTrending(data.results);
      } catch (error) {
        console.error("Failed to fetch Trending Movies :", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    // update the curent movie index after every three seconds
    const intervalId = setInterval(() => {
      setCurrentMovieIndex((prevIndex) =>
        prevIndex === trending.length - 1 ? 0 : prevIndex + 1
      );
      console.log("updated index");
    }, 3000);
    return () => clearInterval(intervalId);
  }, [trending]);

  return (
    <>
      <h1>Movie List</h1>
      {trending.length > 0 ? (
        <>
          <p>{trending[currentMovieIndex].title}</p>
          <Image
            src={`https://image.tmdb.org/t/p/original${trending[currentMovieIndex].poster_path}`}
            alt={trending[currentMovieIndex].title}
            width={300}
            height={200}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Hero;
