"use client";

import CakeCard from "./CakeCard";
import { getAllCakes } from "./cakeData";

export default function CakeCardGrid() {
  const cakes = getAllCakes();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {cakes.map((cake) => (
        <CakeCard key={cake.id} cake={cake} />
      ))}
    </div>
  );
}