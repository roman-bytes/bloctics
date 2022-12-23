import React from "react";
import { Link } from '@remix-run/react';

// export const loader = async ({ request }) => {
//
// };

function Index() {
  return (
    <main className="flex w-full h-full justify-center items-center flex-col">
      <img className="mb-6" src="./bloctics-logo.png" alt="Bloctics logo" />
      <Link to="game"><img src="./play-button.png" alt="Play Game" /></Link>
    </main>
  );
}

export default Index;
