"use client"
import React, { useEffect, useState } from 'react'
import styles from '../styles/Releases.module.css'
import Link from 'next/link'
import { getGenre, upComing } from '@/utilis'
import Image from 'next/image'
import Modal from './Modal'
import Modals from './Modals'
interface Releases {
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
interface genre{
  id: number;
  name: string;
}
const Releases = () => {
    const [newFeatures, setNewFeatures] = useState<Releases[]>([])
    const [topFour, setTopFour] = useState<Releases[]>([])
    const [genres, setGenres] = useState<genre[]>([])
    const [selectedItem, setSelectedItem] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
  
   
    

    useEffect(() => {
        const fetchUpcoming = async  () => {
            try{
                const newReleases = await upComing()
                setNewFeatures(newReleases.results)
                // console.log(newReleases.results);
                
            }
            catch(error){
                console.error(error)
            }
        }
        const fetchGenres = async () => {
          try{
            const genres = await getGenre()
            setGenres(genres.genres)
          }
          catch (error){
           console.error("there was an error fetching the genres", error)
          }
        }
        fetchGenres()
        fetchUpcoming()
    },[])

    useEffect(() => {
      const newTopFour = newFeatures?.slice(0, 4);
      setTopFour(newTopFour);
  }, [newFeatures]);

 const getGenreName = (id : number) => {
  const genre = genres.find((g) => g.id === id)
  return genre ? genre.name : "unknown"
 }
  // console.log("neww", topFour);

  const openModal = (selectedItem : any) => {
    console.log("opened modal for", selectedItem)
    setSelectedItem(selectedItem);
    setIsModalOpen(true);
  }
      
  return (
    <div className={styles.releases_wrapper}>
      <header className={styles.releases__header}>
        <h1 className={styles.releases_h1__header}>Top Rated</h1>
        <Link href='/' >See All</Link>
      </header>
      <main className={styles.movies_container__releases}>
        {topFour ? topFour?.map((movie, id) => (
          <div key={id} className={styles.card} onClick={() => openModal(movie)}>
            
            <div className={styles.card__img}>
            <Image src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} fill alt={movie.title} />
            </div>
            <div className={styles.movie_details}>
              <h4 className={styles.movie_details__h4}>{movie.title}</h4>
              <p className={styles.movie_details_p}>{getGenreName(movie.genre_ids[0])}</p>
            </div>
          </div>
        )): <div></div>}

      </main>
       {isModalOpen && selectedItem && (
        <Modals
          isModalOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedItem={selectedItem}
        />
      )}
    </div>
  )
}

export default Releases
