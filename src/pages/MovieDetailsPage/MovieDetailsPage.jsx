import { Suspense, useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";

import css from "./MovieDetailsPage.module.css";
import { fetchDataDetails } from "../../tmdbApi";

export default function MovieDetailsPage() {
  const [detail, setDetail] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/movies");

  useEffect(() => {
    async function getDataById() {
      try {
        setLoader(true);
        setError(false);
        const data = await fetchDataDetails(movieId);
        setDetail(data);
      } catch (error) {
        setError(error.message || "Щось пішло не так");
      } finally {
        setLoader(false);
      }
    }
    getDataById();
  }, [movieId]);
  
  return (
    <>
      <Link to={backLinkRef.current} className={css.btn}>
        Go Back
      </Link>
      {loader && <p>Please wait, loading ...</p>}
      {error && <p>Please reload the page </p>}
      {detail && (
        <div className={css.section}>
          <h2>
            {detail.title} <span>({detail.release_date})</span>
          </h2>
          <div className={css.boxHeroPic}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${detail.backdrop_path}`}
              alt={detail.title}
            ></img>
          </div>
          <p> {detail.original_title}</p>
          <h3>Overview: </h3> <p>{detail.overview} </p>
          <h3>Genres</h3>
          <p>
            {detail.genres.map((item) => (
              <span key={item.id}> {item.name} </span>
            ))}
          </p>
          <ul className={css.container} key={`detail-${Date.now()}`}>
            {detail.production_companies.map((item) => (
              <li className={css.logo} key={`production_companies${item.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
                  key={item.id}
                  width="100"
                  alt="item.title"
                />
                <p>{item.name}</p>
              </li>
            ))}
          </ul>
          <a
            className={css.btn}
            target="_blank"
            href={detail.homepage}
            rel="noreferrer noopener"
          >
            {detail.homepage}
          </a>
        </div>
      )}
      <div>
        <ul key={Date.now()}>
          <li key="cast">
            <Link to="cast">Cast</Link>
          </li>
          <li key="reviews">
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
        <Suspense fallback={"Loading page..."}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
}