import "./styles.css";
import React, { useState }  from 'react';
import Navbar from './Navbar';
import SearchBar from "./Searchbar";
import { searchMovies } from './api';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [query1, setQuery1] = useState('');
  const [query2, setQuery2] = useState('');
  const [searchResults1, setSearchResults1] = useState([]);
  const [searchResults2, setSearchResults2] = useState([]);
  const handleSearchResults = (results) => {
    setMovies(results);
  };
  const handleViewMore = (movie) => {
    setSelectedMovie(movie);
    setMovies([]); // Clear search results
  };
  const [movie1, setMovie1] = useState(null);
  const [movie2, setMovie2] = useState(null);
  const handleSelectMovie1 = (movie) => {
    setMovie1(movie);
  };
  
  const handleSelectMovie2 = (movie) => {
    setMovie2(movie);
  };
  const handleSearch1 = async (query) => {
    setQuery1(query);
    // Replace the following with your API call to search movies
    const results = await searchMovies(query);
    setSearchResults1(results);
  };
  
  const handleSearch2 = async (query) => {
    setQuery2(query);
    // Replace the following with your API call to search movies
    const results = await searchMovies(query);
    setSearchResults2(results);
  };
  
  return (
    <div>
      <Navbar />
      
               <SearchBar onSearchResults={handleSearchResults} />
               {!selectedMovie ? (
        <>
      <main>
      <div className="movies-list">
          {movies.length === 0 ?  (
            <p>No movies found.</p>
          ) :(
            movies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Poster image URL
                  alt={movie.title}
                  className="movie-poster"
                />
                <div className="movie-details">
                  <div className="movie-title">{movie.title}</div>
                  <div className="movie-release-date">{movie.release_date}</div>
                  <button
                        className="more-info-button"
                        onClick={() => handleViewMore(movie)}
                      >
                        View More
                      </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      </>
      ) : (
        <main>
          <div className="cardm">
            <img
              src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
              className="posterm"
            />
            <div className="detailsm">
              
              <div className="titlem">{selectedMovie.title}</div>
              <div className="release-datem">{selectedMovie.release_date}</div>
              <div className="overviewm">{selectedMovie.overview}</div>
              <div className="genres">
                <strong>Genres:</strong>
                {selectedMovie.genres?.map((genre) => (
                  <span key={genre.id}>{genre.name}</span>
                )) || 'Not available'}
              </div>
              <p><strong>Paid/Free:</strong> {selectedMovie.is_paid ? 'Paid' : 'Free'}</p>
              <p><strong>Where to Watch:</strong> {selectedMovie.watch_providers?.join(', ') || 'Not available'}</p>
              <p><strong>Revenue:</strong> ${selectedMovie.revenue?.toLocaleString() || 'N/A'}</p>
              <p><strong>Rating:</strong> {selectedMovie.vote_average} ({selectedMovie.vote_count} votes)</p>
              
            </div>
          </div>
        </main>
      )}
      <div className="compare-section">
  <h2>Compare Movies</h2>
  <div className="comparison-controls">
    <div className="select-movie">
      <h3>Select Movie 1</h3>
      <input
        type="text"
        value={query1}
        onChange={(e) => handleSearch1(e.target.value)}
        placeholder="Search Movie 1..."
      />
      {searchResults1.length > 0 && (
        <div className="suggestions-boxes">
          {searchResults1.map((movie) => (
            <div
              key={movie.id}
              onClick={() => handleSelectMovie1(movie)}
              className={`suggestion-box ${movie1 && movie1.id === movie.id ? 'selected' : ''}`}
            >
              <img
                src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                alt={movie.title}
                className="suggestion-poster"
              />
              <div className="suggestion-title">{movie.title}</div>
            </div>
          ))}
        </div>
      )}
    </div>

    <div className="select-movie">
      <h3>Select Movie 2</h3>
      <input
        type="text"
        value={query2}
        onChange={(e) => handleSearch2(e.target.value)}
        placeholder="Search Movie 2..."
      />
       {searchResults2.length > 0 && (
        <div className="suggestions-boxes">
          {searchResults2.map((movie) => (
            <div
              key={movie.id}
              onClick={() => handleSelectMovie2(movie)}
              className={`suggestion-box ${movie2 && movie2.id === movie.id ? 'selected' : ''}`}
            >
              <img
                src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                alt={movie.title}
                className="suggestion-poster"
              />
              <div className="suggestion-title">{movie.title}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>

  {movie1 && movie2 && (
    <div className="movie-comparison">
      <div className="movie-card">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie1.poster_path}`}
          alt={movie1.title}
          className="movie-poster"
        />
        <div className="movie-details">
          <div className="movie-title">{movie1.title}</div>
          <div className="movie-release-date">{movie1.release_date}</div>
          <div className="movie-overview">{movie1.overview}</div>
          <p><strong>Rating:</strong> {movie1.vote_average} ({movie1.vote_count} votes)</p>
          <p><strong>Revenue:</strong> {movie1.revenue ? `$${movie1.revenue.toLocaleString()}` : 'N/A'}</p>
        </div>
      </div>

      <div className="movie-card">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie2.poster_path}`}
          alt={movie2.title}
          className="movie-poster"
        />
        <div className="movie-details">
          <div className="movie-title">{movie2.title}</div>
          <div className="movie-release-date">{movie2.release_date}</div>
          <div className="movie-overview">{movie2.overview}</div>
          <p><strong>Rating:</strong> {movie2.vote_average} ({movie2.vote_count} votes)</p>
          <p><strong>Revenue:</strong> {movie2.revenue ? `$${movie2.revenue.toLocaleString()}` : 'N/A'}</p>
        </div>
      </div>
    </div>
  )}
</div>

    </div>
  );
};

export default App;