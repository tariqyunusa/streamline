"use client";

import { Hero, Latest, Search } from "@/components";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <Latest />
      <Search />
    </main>
  );
}
