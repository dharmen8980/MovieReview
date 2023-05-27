import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "./Card";

const Home = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:8080/api/v1/movies");
    console.log(response.data);
    setData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
      <div className="max-w-[1200px] mx-auto grid grid-cols-3 sm:grid-cols-4 gap-4">
        {data.map((movie) => (
          <div key={movie.imdbId}>
            <a href={`/movies/${movie.imdbId}`}>
              <Card title={movie.title} poster={movie.poster} />
            </a>
          </div>
        ))}
      </div>
  );
};

export default Home;
