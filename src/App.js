import logo from "./logo.svg";
import React from "react";
import axios from "axios";
import "./App.css";
import "./MovieList.css";
function App() {
  const [popularMovies, setPopularMovies] = React.useState();
  const [popularLoading, setPolularLoading] = React.useState(false);
  const [comingSoonMovies, setComingSoonMovies] = React.useState();
  const [comingSoonLoading, setComingSoonLoading] = React.useState();

  React.useEffect(() => {
    axios.get("http://localhost:7001/get-polular-movies").then((response) => {
      console.log("---- polular movies", response);

      if (response.status === 200) {
        setPopularMovies(response.data.result.results);
        setPolularLoading(true);
      }
    });

    axios.get("http://localhost:7002/api/get-coming-soon").then((response) => {
      console.log("---- coming soon", response);

      if (response.status === 200) {
        setComingSoonMovies(response.data.result.results);
        setComingSoonLoading(true);
      }
    });
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Movie List</h1>
      </header>
      <div className="container">
        <h1>Popular Movies MSA1 - nodejs</h1>
        <div className="movie-list">
          {popularLoading &&
            popularMovies.map((movie) => (
              <div key={movie.id} className="movie-item">
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
                <h2>{movie.title}</h2>
                <p>{movie.overview}</p>
              </div>
            ))}
        </div>
        <h1>Coming Soon Movies MSA2 - nestjs</h1>
        <div className="movie-list">
          {comingSoonLoading &&
            comingSoonMovies.map((movie) => (
              <div key={movie.id} className="movie-item">
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
                <h2>{movie.title}</h2>
                <p>{movie.overview}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
