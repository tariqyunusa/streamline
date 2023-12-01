"use client";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";
import { getGenre, getCast } from "@/utilis";
import "../styles/Modal.css";
import { Button } from ".";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  movieData?: Movie | null;
}
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
interface Genre {
  id: number;
  name: string;
}
interface people {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, movieData }) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [cast, setCast] = useState<people[]>([]);

  if (!isOpen || !movieData) {
    return null;
  }

  useEffect(() => {
    const getGenres = async () => {
      try {
        const data = await getGenre();
        setGenres(data.genres || []);
      } catch (error) {
        console.error("Failed to fetch genres", error);
      }
    };

    getGenres();
  }, []);
  useEffect(() => {
    const cast = async () => {
      try {
        if (!movieData) {
          console.error("movieData is undefined");
          return;
        }

        const data = await getCast(movieData.id);
        setCast(data.cast);
        console.log(data.cast);
      } catch (error) {
        console.error("Failed to fetch cast", error);
      }
    };
    cast();
  }, []);

  const getGenreTitle = (genreIds: number[]) => {
    const movieGenres = genreIds.map((id) => {
      const genre = genres.find((g) => g.id === id);
      return genre ? genre.name : "Loading Genre";
    });

    return movieGenres.join(", ");
  };
  const newCast = cast.slice(0, 5);
  const numberArray = Array.from({ length: 50 }, (_, index) => index + 1);
  // console.log(numberArray);
  const ticket = () => {
    alert("you just bought tickets");
  };

  return (
    <div className="mo">
      <div className={`modal ${isOpen ? "open" : ""}`}>
        <div className="modal_data">
          {movieData && (
            <div className="modal_content">
              <div className="modal_img">
                <Image
                  src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
                  fill={true}
                  alt={movieData.title}
                />
              </div>
              <div className="moviedata_info">
                <div className="movie">
                  <h2 className="movie_title">{movieData.title}</h2>
                  <p className="movie_overview">{movieData.overview}</p>
                </div>

                <div className="cast">
                  <h3 className="cast_header">Cast</h3>
                  <ul className="cast_ul">
                    {newCast.map((actor) => (
                      <li className="cast_li" key={actor.id}>
                        <div className="actor_info">
                          <div className="cast_img">
                            <Image
                              src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
                              fill={true}
                              alt={actor.name}
                            />
                          </div>
                          <p className="cast_name">{actor.name}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <h5 className="movie_genres">
                    {getGenreTitle(movieData.genre_ids)}
                  </h5>
                  <h6>Screening Date: {movieData.release_date}</h6>{" "}
                  <div className="preference">
                    <div className="seats">
                      <h3 className="seats_header">Select Seat</h3>
                      <input
                        type="text"
                        className="seats_input"
                        placeholder="A1"
                      />
                    </div>
                    <div className="tickets">
                      <h3 className="tickets_header">Number of tickets</h3>
                      <select name="" id="" className="tickets_select">
                        {numberArray.map((index) => (
                          <option>{index}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button className="ticket_buy" onClick={ticket}>
                    Buy Ticket
                  </button>
                </div>
              </div>
            </div>
          )}
          <button onClick={onClose} className="close_btn">
            <FaTimes />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
