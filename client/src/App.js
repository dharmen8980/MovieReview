import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Movie from "./Movie";
import {AiOutlineHome} from "react-icons/ai";

function App() {
  return (
    <BrowserRouter>
      <a
        href="/"
        className="text-xl bg-gradient-to-tr from-orange-500 to-orange-900 flex flex-row justify-between mt-4 py-2 px-4 items-center"
      >
        <span><AiOutlineHome/></span><span>Movies Reviewed</span><span></span>
      </a>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:id" element={<Movie />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
