"use client";
import { fetchTrending } from "@/utilis";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "../styles/Hero.css";
import { Button, Loader, Modal } from ".";
import imdb from "../public/imdb.png";
import { useRef, } from "react";
import AnimateTitle from "@/app/Animations/anim";

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [];
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
  const [nextMovieIndex, setNextMovieIndex] = useState(1);
  const [modalMovieData, setModalMovieData] = useState<Movie | null>(null);
  const newRating = trending.map(
    (movie) => Math.round(movie.vote_average * 10) / 10
  );
  const titleRef = useRef(null)

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
  useEffect(() => {
    const nexInterval = setInterval(() => {
      setNextMovieIndex((prev) =>
        prev === trending.length - 1 ? 0 : prev + 2
      );
    }, 3000);
    return () => clearInterval(nexInterval);
  }, [trending]);

  const openModal = () => {
    console.log("modal opened");
    setModalMovieData(trending[currentMovieIndex]);

    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    console.log("modal closed");
  };
  const logCurrentMovieTitle = () => {
    if (trending.length > 0 && trending[currentMovieIndex].title) {
      console.log("Current Movie", trending[currentMovieIndex].title);
    }
  };
  useEffect(() => {
    AnimateTitle(titleRef.current)
  },[trending, currentMovieIndex])


  return (
    <div className="hero">
      {trending.length > 0 && trending[currentMovieIndex] ? (
        <div className="hero_container">
          <Image
            src={`https://image.tmdb.org/t/p/original${trending[currentMovieIndex].poster_path}`}
            alt={trending[currentMovieIndex].title}
            fill={true}
            className="hero_image"
            // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="info">
            <div className="title">
           
            <h1 className="hero_title" ref={titleRef}>
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

                <h4>
                  {" "}
                  TMDB RATING:
                  <span className="voter_average_rating">
                    {newRating[currentMovieIndex]}
                  </span>
                </h4>
              </div>
            </div>
            <div className="hero_btn">
              <Button title="Get Tickets" onClick={openModal} />
            </div>
            {isOpen ? (
              <Modal
                isOpen={isOpen}
                onClose={closeModal}
                movieData={modalMovieData}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Hero;
