import React, { useState, useEffect } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';

const api_key = "15d2ea6d0dc1d476efbca3eba2b9bbfb";

function App() {

  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [newReview, setNewReview] = useState('');

  function refreshPage() {
    window.location.reload(false);
  }

  useEffect(async () => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      // data1 = response.data;
      // async data1.map(el => {
      //   el.posterLink = "lalalala";
      // });
      // console.log(response.data);
      // await 

      const fetchData = (film) => {
        Axios.get("https://api.themoviedb.org/3/search/movie?api_key=" + api_key + "&query=" + film + "&callback=?").then
          (async (response) => {
            let data = JSON.parse(response.data.slice(2, -1)).results[0].poster_path;
            console.log("http://image.tmdb.org/t/p/w500" + data)
            return await data;
          })
      }

      response.data.map(async el => el.posterLink = await fetchData(el.movieName))
      console.log(response.data);
      setMovieList(response.data);
    })
  }, [])

  const submitReview = () => {
    if (movieName !== '' & review !== '') {
      Axios.post('http://localhost:3001/api/insert', {
        movieName: movieName,
        movieReview: review
      }).then(() => {
        console.log("successful insert");
      });
      // setMovieList([...movieList,
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
      <section className="container form-signin my-5 text-center">
        <h1 className="mb-3 fw-normal">Movie Review</h1>
        <input className="mb-3 form-control" placeholder="Moview name"
          type="text"
          name="movieName"
          onChange={(e) => {
            setMovieName(e.target.value)
          }} required />
        <input className="mb-3 form-control" placeholder="Moview review"
          type="text"
          name="review"
          onChange={(e) => {
            setReview(e.target.value)
          }} required />
        <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={submitReview}>Submit</button>
      </section>

      <section className="container my-5">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
          {movieList.map((val) => {
            return <div className="col mt-3">
              <div className="card shadow-sm">
                <h3 className="m-2">{val.movieName}</h3>
                <div className="card-body pt-1">
                  <p className="card-text">{val.movieReview}</p>
                  <input className="form-control mb-2" placeholder="new review" type="text" onChange={(e) => {
                    setNewReview(e.target.value)
                  }} />
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-sm btn-outline-primary" onClick={() => { updateReview(val.movieName) }}>Update</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => { deleteReview(val.movieName) }}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          })}
        </div>
      </section>
    </main>
  );

}

export default App;
