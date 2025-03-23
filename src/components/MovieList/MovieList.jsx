import { Link, useLocation } from "react-router-dom";
//import fetchDataTrending from "../../tmdbApi";
import css from "./MovieList.module.css";

//import { useState, useEffect } from "react";
import MovieDetailsPage from "../../pages/MovieDetailsPage/MovieDetailsPage";
export default function MovieList({ value }) {

  const location = useLocation();

  return (
    <>
      <div>
        <ul className={css.list}>
          {value.map((item, index) => {
            return (
              <li key={`${item.id} ${index}`} className={css.item}>
                <p>
                  <Link
                    to={`/movies/${item.id}`}
                    className={css.link}
                    state={location}
                  >
                    <span>
                      <span> {item.title}</span>
                      <span> ({item.release_date})</span>
                    </span>
                  </Link>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}