import React, { useState, useEffect } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';

function App() {

  const [movieName, setMovieName] = useState('');
  const [movieReview, setMovieReview] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [newReview, setNewReview] = useState('');

  const refreshPage = () => setTimeout(() => { window.location.reload(); }, 50);

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => setMovieList(response.data))
  }, [])

  const submitReview = () => {
    if (movieName !== '' & movieReview !== '') {
      Axios.post('http://localhost:3001/api/insert', {
        movieName: movieName,
        movieReview: movieReview
      });
      refreshPage();
    }
  };

  const deleteReview = (movieName) => {
    Axios.delete(`http://localhost:3001/api/delete/${movieName}`);
    refreshPage();
  };

  const updateReview = (movieName) => {
    if (newReview !== '') {
      Axios.put(`http://localhost:3001/api/update`, {
        movieName: movieName,
        movieReview: newReview
      });
      refreshPage();
    }
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
            setMovieReview(e.target.value)
          }} required />
        <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={submitReview}>Submit</button>
      </section>

      <section className="container my-5">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
          {movieList.map((val) => {
            return <div className="col mt-3">
              <div className="card shadow-sm text-center">
                <h3 className="m-3">{val.movieName}</h3>
                <div className="card-footer">
                  <p className="card-text">{val.movieReview}</p>
                  <input className="form-control mb-2" placeholder="new review" type="text" onChange={(e) => setNewReview(e.target.value)} />
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
    </main >
  );
}

export default App;