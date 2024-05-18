"use client";

import { Hero, Latest, Search, Releases } from "@/components";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <Latest />
      <Releases />
      <Search />
    </main>
  );
}
