import { Link } from "react-router-dom";
//import css from "./NotFoundPage.module.css";
export default function NotFoundPage() {
  return (
    <div /*className={css.notFound}*/>
      <h2>no information found</h2>
      <Link to="/" /*className={css.link}*/>
        Home
      </Link>
    </div>
  );
}