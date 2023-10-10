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
  const [trending, SetTrending] = useState<movie[] | null>([]);
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

    // update the curent movie index after every three seconds
    const intervalId = setInterval(() => {
      setCurrentMovieIndex(
        (prevIndex) => (prevIndex + 1) % (trending?.length || 1)
      );
      console.log("updated index");
    }, 5000);
    return () => clearInterval(intervalId);
  }, [trending]);

  return (
    <>
      {trending && trending.length > 0 && (
        <div
          style={{
            backgroundImage: `url('https://image.tmdb.org/t/p/original${trending[currentMovieIndex].poster_path}')`,
          }}
        >
          <h1 className="text-4xl font-bold">
            {trending[currentMovieIndex].title}
          </h1>
        </div>
      )}
    </>
  );
};

export default Hero;
