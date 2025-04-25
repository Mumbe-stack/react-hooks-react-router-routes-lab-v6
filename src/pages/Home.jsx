import React from "react";
import { Link } from "react-router-dom";

function Home({ movies = [] }) {
  return (
    <div>
      <h1>Home Page</h1>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <Link to={`/movie/${movie.id}`}>View Info</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
