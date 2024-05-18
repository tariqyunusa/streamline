"use client"
import React, { useEffect, useState } from 'react'
import "../styles/Releases.css"
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
    <div className='releases_wrapper'>
      <header className='releases__header'>
        <h1 className='releases_h1__header'>Top Rated</h1>
        <Link href='/'>See All</Link>
      </header>
      <main className='movies_container__releases'>
        {topFour ? topFour?.map((movie, id) => (
          <div key={id} className='card' onClick={() => openModal(movie)}>
            <Modals
             isModalOpen={isModalOpen}
             onClose={() => setIsModalOpen(false)}
             selectedItem={selectedItem}
            />
            <div className='card__img'>
            <Image src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} fill alt={movie.title} />
            </div>
            <div className='movie_details'>
              <h4 className='movie_details__h4'>{movie.title}</h4>
              <p className='movie_details_p'>{getGenreName(movie.genre_ids[0])}</p>
            </div>
          </div>
        )): <div></div>}

      </main>
    </div>
  )
}

export default Releases
