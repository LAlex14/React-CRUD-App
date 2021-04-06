import React, { useState, useEffect } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
// import { findDomNode } from 'react-dom';
import Axios from 'axios';

function App() {

  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieReviewList, setMovieList] = useState([]);
  const [newReview, setNewReview] = useState('');
  // const [posterLink, setPosterLink] = useState('');

  function refreshPage() {
    window.location.reload(false);
  }

  function getPoster(film) {
    return $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=" + film + "&callback=?", (json) => {
      return "http://image.tmdb.org/t/p/w500" + json.results[0].poster_path;
    })
  }

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      // console.log(response.data);
      setMovieList(response.data);
    })
  }, [])

  movieReviewList.forEach((el) => {
    el.posterLink = getPoster(el.movieName);
  })

  const submitReview = () => {
    if (movieName !== '' & review !== '') {
      Axios.post('http://localhost:3001/api/insert', {
        movieName: movieName,
        movieReview: review

      }).then(() => {
        console.log("successful insert");
      });
      // setMovieList([...movieReviewList,
      // { movieName: movieName, movieReview: review },
      // ]);
      // refreshPage();
      refreshPage();
    }
  };


  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
    refreshPage();
  };

  const updateReview = (movie) => {
    Axios.put(`http://localhost:3001/api/update`, {
      movieName: movie,
      movieReview: newReview
    });
    setNewReview('');
    refreshPage();
  };

  return (
    <main>
      <section className="form-signin py-5 text-center container">
        <form>
          <h1 className="h3 mb-3 fw-normal">Movie Review</h1>

          {/* <h3>Movie name:</h3> */}
          <input className="mb-3 form-control" placeholder="Moview name"
            type="text"
            name="movieName"
            onChange={(e) => {
              setMovieName(e.target.value)
            }} required />
          {/* <h3>Review:</h3> */}
          <input className="mb-3 form-control" placeholder="Moview review"
            type="text"
            name="review"
            onChange={(e) => {
              setReview(e.target.value)
            }} required />
          <div>
            <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={submitReview}>Submit</button>
          </div>
        </form>
      </section>

      <section className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">


            {movieReviewList.map((val) => {
              return <div className="col mt-3">
                {/* {console.log(getPoster(val.movieName))} */}
                <div className="card shadow-sm">
                  <img className="bd-placeholder-img card-img-top" width="100%" src={val.posterLink} alt="Movie Poster" />
                  <h3 className="p-1 pl-2">{val.movieName}</h3>
                  <div className="card-body">
                    <p className="card-text">{val.movieReview}</p>
                    <input className="form-control mb-2" placeholder="new review" type="text" onChange={(e) => {
                      setNewReview(e.target.value)
                    }} />
                    <div className="d-flex justify-content-between align-items-center">
                      {/* <div className="btn-group"> */}
                      <button className="btn btn-sm btn-outline-primary" onClick={() => { updateReview(val.movieName) }}>Upldate</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => { deleteReview(val.movieName) }}>Delete</button>
                      {/* </div> */}
                    </div>
                  </div>
                </div>
              </div>
            })}
          </div>
        </div>
      </section>

    </main >
  );
}

export default App;
