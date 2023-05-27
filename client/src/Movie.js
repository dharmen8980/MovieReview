import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";

const Movie = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState([]);
  const [userReview, setUserReview] = useState("");

  const fetchMovie = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/v1/movies/${id}`
    );
    setMovie(response.data);
    console.log(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userReview === "") return;
    const response = await axios.post("http://localhost:8080/api/v1/reviews", {
      imdbId: id,
      reviewBody: userReview,
    });
    console.log(response.data);
    setMovie(response.data);
    fetchMovie();
  };

  useEffect(() => {
    fetchMovie();
  }, []);
  return (
    <main className="max-w-[1200px] mx-auto h-[100svh] flex flex-col justify-around">
      {movie ? (
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          showArrows={true}
        >
          {movie.backdrops?.map((backdrop) => (
            <div key={backdrop} className="h-[60svh]">
              <img
                src={backdrop}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <p className="legend text-lg">{movie.title}</p>
            </div>
          ))}
        </Carousel>
      ) : (
        <p className="text-xl animate-pulse w-fit mx-auto">
          Loading posters ...
        </p>
      )}
      <div className="flex flex-row gap-16 h-[30svh] opacity-90">
        <div>
          <img
            src={movie.poster}
            alt={movie.title}
            className="max-w-[300px] h-full object-cover rounded-lg"
          />
        </div>
        <div className="text-[1.3rem] flex flex-row gap-6">
          <div>
            <p>Movie: </p>
            <p>Release Date: </p>
            <p>Trailer Link: </p>
            <p>Genres: </p>
            <hr />
            <p className="my-4">Reviews: </p>
          </div>
          <div>
            <p>{movie.title}</p>
            <p>{movie.releaseDate}</p>
            <a
              href={movie.trailerLink}
              target="_blank"
              rel="noreferrer"
              className="text-yellow-200"
            >
              {movie.trailerLink}
            </a>
            <p>
              {movie.genres?.map((genre) => (
                <span key={genre}>{genre}, </span>
              ))}
            </p>
            <hr />
            <div className="mt-4">
              {movie.reviewIds && (
                <div className="space-y-2">
                  {movie.reviewIds.map((review) => (
                    <p className="border-2 border-white px-4 bg-orange-600">
                      {review.body}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-row justify-between my-2 gap-2"
            >
              <input
                type="text"
                placeholder="Add a review"
                className="border-2 border-white px-4 w-full text-black"
                name="reviews"
                onChange={(e) => setUserReview(e.target.value)}
              />
              <button className="border-2 border-white px-4" type="submit">
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Movie;
