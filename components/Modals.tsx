import React from "react";
import "../styles/Modal.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import { getGenre, getCast } from "@/utilis";
import { FaTimes } from "react-icons/fa";

interface ModalProp {
  //   isOpen: boolean;
  onClose: () => void;
  selectedItem: Movie | null;
  isModalOpen: boolean;
}
interface Movie {
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
const Modals: React.FC<ModalProp> = ({
  onClose,
  selectedItem,
  isModalOpen,
}) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [cast, setCast] = useState<people[]>([]);
  useEffect(() => {
    const getGenres = async () => {
      try {
        const data = await getGenre();
        setGenres(data.genres || null);
        // console.log("genre for modals", data.genres);
      } catch (error) {
        console.error("error while fetching genres", error);
      }
    };
    const Cast = async () => {
      try {
        if (!selectedItem) {
          console.log("selectedItem is undefined");
          return;
        }
        const data = await getCast(selectedItem.id);
        setCast(data.cast);
        // console.log("cast from modal(s)", data.cast);
      } catch (error) {
        console.error("Failed to fetch Cast", error);
      }
    };
    getGenres();
    Cast();
  }, [selectedItem]);
  if (!isModalOpen || !selectedItem) {
    return null;
  }
  const getGenreTitle = (genreIds: number[]) => {
    const movieGenres = genreIds.map((id) => {
      const genre = genres.find((g) => g.id === id);
      return genre ? genre.name : "Loading Genre";
    });
    return movieGenres.join(", ");
  };
  const newCast = cast.slice(0, 5);
  const numberArray = Array.from({ length: 50 }, (_, index) => index + 1);
  const ticket = () => {
    alert("you just bought tickets");
  };
  return (
    <div className="mo">
      <div className={`modal ${isModalOpen ? "open" : ""}`}>
        <div className="modal_data">
          {selectedItem && (
            <div className="modal_content">
              <div className="modal_img">
                <Image
                  src={`https://image.tmdb.org/t/p/original${selectedItem.poster_path}`}
                  fill={true}
                  alt={selectedItem.title}
                />
              </div>
              <div className="moviedata_info">
                <div className="movie">
                  <h2 className="movie_title">{selectedItem.title}</h2>
                  <div className="overview_p">
                    <p className="movie_overview">{selectedItem.overview}</p>
                  </div>
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
                  <div className="genre-Date">
                    <h5 className="movie_genres">
                      {getGenreTitle(selectedItem.genre_ids)}
                    </h5>
                    <h6>Screening Date: {selectedItem.release_date}</h6>
                  </div>
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

export default Modals;
