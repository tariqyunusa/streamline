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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTrending();
        console.log("Fetched Data:", data);
        SetTrending(data.results);
      } catch (error) {
        console.error("Failed to fetch Trending Movies :", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        <div className="w-full h-full">
          {Array.isArray(trending) && trending.length > 0 ? (
            <div>
              {trending.map((movie) => (
                <div>
                  <li key={movie.id}>{movie.title}</li>
                  <Image
                    src={movie.poster_path}
                    alt={movie.title}
                    width={100}
                    height={100}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p>{JSON.stringify(trending)}</p>
              <p>no movies</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Hero;
