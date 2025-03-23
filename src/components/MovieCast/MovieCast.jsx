import { useEffect, useState } from "react";
import { fetchDataCredits } from "../../tmdbApi";
import css from "./MovieCast.module.css";
import { useParams } from "react-router-dom";

export default function MovieCast() {
  const [value, setValue] = useState([]);
  const { movieId } = useParams();
  const defaultImg =
    "<https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg>";
  useEffect(() => {
    async function getDataCredits() {
      if (!movieId) {
        return;
      }
      const response = await fetchDataCredits(movieId);
      const data = response.cast.slice(0, 5);

      setValue(data);
    }
    getDataCredits();
  }, [movieId]);

  return (
    <>
      <h2>MovieCast</h2>
      {value.length > 0 && (
        <ul key={`movie-${value.id}`} className={css.list}>
          {value.map((item, index) => (
            <li key={`${item.id}-${index}`}>
              <h3>{item.name}</h3>
              <div className={css.boxImg}>
                <img
                  src={
                    item.profile_path
                      ? `https://image.tmdb.org/t/p/w200/${item.profile_path}`
                      : defaultImg
                  }
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}