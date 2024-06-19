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
  const imgRef = useRef(null)
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
    }, 5000);

    return () => clearInterval(intervalId);
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
 
  useEffect(() => {
    AnimateTitle(titleRef.current, imgRef.current)
  },[trending, currentMovieIndex])


  return (
    <div className="hero">
      {trending.length > 0 && trending[currentMovieIndex] ? (
        <div className="hero_container">
        <div className="hero_img__container">
        {trending.map((movie, idx) => (
              <Image
                key={movie.id}
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
                fill={true}
                className={`hero_image ${
                  currentMovieIndex === idx ? "visible" : ""
                }`}
                ref={currentMovieIndex === idx ? imgRef : null}
              />
            ))}
        <div className="info">
            <div className="title">
           
            <h1 className="hero_title" ref={titleRef}>
                {trending[currentMovieIndex].title}
              </h1>
            


              <div className="rating">
                <p>
                {trending[currentMovieIndex].overview}
                </p>
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
          
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Hero;
