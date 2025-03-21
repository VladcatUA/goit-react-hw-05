import { lazy, Suspense, /*useState*/ } from "react";
import { Routes, Route } from "react-router-dom";
import './App.css'

/*import Navigation from "./components/Navigation/Navigation";*/
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage")
);

//const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
//const MovieReviews = lazy(() => import("./components/MovieReviews/MovieReviews"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

function App() {
 // const [count, setCount] = useState(0)

  return (
    <>
     <h1>Ukraine</h1>
     <Suspense fallback={"Loading page..."}>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/movies" element={<MoviesPage />}/>
        <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
     </Suspense>
    </>
  )
}

export default App
