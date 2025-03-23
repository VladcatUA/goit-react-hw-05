import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import css from "./MoviesPage.module.css";
import { fetchDataWithSearch } from "../../tmdbApi";
import MovieList from "../../components/MovieList/MovieList";
import { Link, useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [page/*, setPage*/] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const [valueQueryWithDebounce] = useDebounce(query, 1000);

  const changeSearchText = (event) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (event.target.value !== "") {
      newSearchParams.set("query", event.target.value);
    } else {
      newSearchParams.delete("query");
    }
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    async function getValueApi() {
      try {
        setError(false);
        setLoader(true);

        const response = await fetchDataWithSearch(
          valueQueryWithDebounce,
          page
        );

        const data = response.results;
        setGallery(data);
      } catch (error) {
        setError(error.message || "Щось пішло не так");
      } finally {
        setLoader(false);
      }
    }
    getValueApi();
  }, [valueQueryWithDebounce, page]);
 
  return (
    <>
      <div>
        <div className={css.conteiner}>
          <input type="text" value={query} onChange={changeSearchText} />
        </div>

        {loader && <p>loader......</p>}
        {error && <p>error with connection..</p>}
        {gallery.length > 0 && <MovieList value={gallery} />}
      </div>
    </>
  );
}