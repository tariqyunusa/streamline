"use client";
import React, { useEffect, useState } from "react";
import styles from "../styles/Latest.module.css"
import { fetchTrending, getGenre } from "@/utilis";
import Image from "next/image";
import { Dropdown, Modal } from ".";
import Modals from "./Modals";

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

interface Genre {
  id: number;
  name: string;
}

const Latest = () => {
  const [fetchData, setFetchData] = useState<FetchItem[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FetchItem | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await fetchTrending();
        setFetchData(movies.results);
        // console.log(movies.results);
      } catch (error) {
        console.error("Failed to fetch movies", error);
      }
    };

    const fetchGenres = async () => {
      try {
        const genreData = await getGenre();
        setGenres(genreData.genres);
      } catch (error) {
        console.error("Failed to fetch genres", error);
      }
    };

    fetchMovies();
    fetchGenres();
  }, []);
  const openModal = (selectedItem: FetchItem) => {
    console.log("opened modal for:", selectedItem);
    setSelectedItem(selectedItem);
    setIsModalOpen(true);
  };

  const limitedMovies = fetchData.slice(0, 6);

  const handleDropdownChange = (selectedValue: number) => {
    setSelectedGenre(selectedValue);
  };

  const filteredMovies = selectedGenre
    ? fetchData.filter((item) => item.genre_ids.includes(selectedGenre))
    : limitedMovies;

  const slicedFilteredMovies = filteredMovies.slice(0, 8);

  return (
    <>
      <div className={styles.latest_wrapper}>
        <div className={styles.header_wrapper}>
          <div>
            <h1 className={styles.latest_header}>New Features</h1>
            <p className={styles.latest_p}>
              Displaying random movies until you select a genre
            </p>
          </div>
          <div className={styles.filters}>
            <Dropdown onChange={handleDropdownChange} />
          </div>
        </div>
        <div className={styles.cards_container}>
          {filteredMovies.length > 0 ? (
            <div className={styles.cards}>
              <Modals
                isModalOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                selectedItem={selectedItem}
              />
              {/* {selectedItem && (
                <div>
                  <h2>{selectedItem.original_title}</h2>
                </div>
              )} */}
              {slicedFilteredMovies.map((item) => (
                <div
                  className={styles.card}
                  key={item.id}
                  onClick={() => openModal(item)}
                >
                  <div className={styles.card_img}>
                    <Image
                      src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                      fill={true}
                      alt={item.title}
                    />
                  </div>
                  <div className={styles.card_details}>
                    <h3 className={styles.card_title}>{item.original_title}</h3>
                    {/* <p className="card-date">
                      Release Date: {item.release_date}
                    </p> */}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.latest_paragraph}>
              {selectedGenre
                ? "No movies for the selected Genre this week."
                : "Displaying limited movies for this week."}
            </div>
          )}
        </div>

        <hr className={styles.hr} />
      </div>
    </>
  );
};

export default Latest;
