import { /*useLocation,*/ useParams } from "react-router-dom";
import css from "./MovieReviews.module.css";
import { fetchReviews } from "../../tmdbApi";
import { useEffect, useState } from "react";
export default function MovieReviews() {
  const [value, setValue] = useState([]);
  const url = useParams();

  const { movieId } = url;

  useEffect(() => {
    async function getDataReviews() {
      try {
        const response = await fetchReviews(movieId);
        const data = response.results;
        setValue(data);
      } catch (error) {
        console.log(`error getDataReviews -${error}`);
      }
    }
    getDataReviews();
  }, [movieId]);

  return (
    <>
      <h2>Reviews</h2>
      {value.length > 0 && (
        <ul key={`reviews-${value.id}`}>
          {value.map((item, /*index*/) => {
            return (
              <li key={item.id} className={css.review}>
                <p>content {item.content}</p>
                <p>author: {item.author}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}