"use client";
import { fetchTrending } from "@/utilis";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "../styles/Hero.css";
import { Button, Modal } from ".";
import imdb from "../public/imdb.png";

interface Movie {
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

const Hero = () => {
  const [trending, setTrending] = useState<Movie[]>([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTrending();
        setTrending(data.results);
      } catch (error) {
        console.error("Failed to fetch Trending Movies:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentMovieIndex((prevIndex) =>
        prevIndex === trending.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(intervalId);
  }, [trending]);

  const openModal = () => {
    console.log("modal opened");
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    console.log("modal closed");
  };

  return (
    <div className="hero">
      {trending.length > 0 && trending[currentMovieIndex] ? (
        <div className="hero_container">
          <Image
            src={`https://image.tmdb.org/t/p/original${trending[currentMovieIndex].poster_path}`}
            alt={trending[currentMovieIndex].title}
            fill={true}
            className="hero_image"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="info">
            <div className="title">
              <h1 className="hero_title">
                {trending[currentMovieIndex].title}
              </h1>
              <div className="rating">
                {/* <Image
                  src={imdb}
                  width={35}
                  height={25}
                  alt="icon"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={true}
                /> */}
                IMDB RATING
                <h4>
                  :{" "}
                  <span className="voter_average_rating">
                    {trending[currentMovieIndex].vote_average}
                  </span>{" "}
                </h4>
              </div>
            </div>

            <Button title="Get Tickets" onClick={openModal} />
            {isOpen ? <Modal isOpen={isOpen} onClose={closeModal} /> : ""}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Hero;
