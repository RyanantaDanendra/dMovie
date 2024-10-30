import './App.css'
import { useEffect, useState } from 'react';
import { getMovieList, searchMovie } from './Api';
import axios from 'axios';

function App() {
  const [movieLists, setMovieLists] = useState([]);

  useEffect(() => {
    getMovieList().then((result) => {
      setMovieLists(result);
    });
  }, [])

  const movieList = movieLists.map((movie, index) => {
    return (
      <div className="movie-wrapper" key={index}>
        <img src={`${import.meta.env.VITE_APP_BASEIMGURL}/${movie.poster_path}`} alt="" className='movie-image' />
        <h2 className='movie-title'>{movie.title}</h2>
        <h4 className='movie-date'>{movie.release_date}</h4>
        <h4 className='movie-rating'>{movie.vote_average}</h4>
      </div>
    )
  })

  const search = async(e) => {
    if(e.length > 3) {
      const query = await searchMovie(e);
      setMovieLists(query.results);
    }
  }

  return (
    <div className="container">
      <div className="title-search">
        <h1>D'Movie</h1>
        <input type="text" onChange={({target}) => search(target.value)} placeholder='Search a Movie. . .' className='movie-search' />
      </div>
      <div className="movies-container">
        {movieList}
      </div>
    </div>
  )
}

export default App
