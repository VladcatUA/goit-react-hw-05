import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";
const linkActiveWidthClsx = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};
export default function Navigation() {
  return (
    <nav className={css.section}>
      <NavLink to="/" className={linkActiveWidthClsx}>
        Home
      </NavLink>
      <NavLink to="/movies" className={linkActiveWidthClsx}>
        Movies
      </NavLink>
    </nav>
  );
}