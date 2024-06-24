"use client";
import { fetchTrending } from "@/utilis";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from '../styles/Hero.module.css'
import { Button, Loader, Modal } from ".";
import { useRef, } from "react";
import AnimateTitle from "../utilis/Animations/anim"

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
  const [previousMovieIndex, setPreviousMovieIndex] = useState<number | null>(null);
  const [modalMovieData, setModalMovieData] = useState<Movie | null>(null);
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
    AnimateTitle(imgRef.current)
  },[trending, currentMovieIndex])


  return (
    <div className={styles.hero}>
      {trending.length > 0 && trending[currentMovieIndex] ? (
        <div className={styles.hero_container}>
        <div className={styles.hero_img__container}>
        {trending.map((movie, idx) => (
              <Image
                key={movie.id}
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
                fill={true}
                className={`${styles.hero_image} ${
                  currentMovieIndex === idx ? styles.visible : previousMovieIndex === idx ? styles.previous : ""
                }`}
                ref={currentMovieIndex === idx ? imgRef : null}
              />
            ))}
        <div className={styles.info}>
            <div className={styles.title}>
           
            <h1 className={styles.hero_title} ref={titleRef}>
                {trending[currentMovieIndex].title}
              </h1>
            


              <div className={styles.rating}>
                <p>
                {trending[currentMovieIndex].overview}
                </p>
              </div>
            </div>
            <div className={styles.hero_btn}>
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
