"use client";
import React from 'react'
import { Hero, Latest, Search, Releases } from "@/components";


const Home = () => {
  return (
    <>
       <Hero />
      <Latest />
      <Releases />
      <Search />
    </>
  )
}

export default Home
