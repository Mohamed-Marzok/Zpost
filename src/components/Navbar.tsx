import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

// Dynamic class name function for NavLink
const itemStyle = ({ isActive }: { isActive: boolean }) =>
  `font-semibold ${isActive ? "underline text-sky-300 " : ""}`;

export default function Navbar() {
  return (
    <div className="flex justify-between bg-sky-700 p-4 text-white 2xl z-50 fixed left-0 right-0 top-0 shadow-lg">
      <div className="flex items-center md:w-1/5 justify-between gap-5">
        <p className="font-bold text-2xl ">
          <Link to="/">Form</Link>
        </p>
        <ul className="flex items-center text-xl justify-between md:grow gap-5">
          <li>
            <NavLink className={itemStyle} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={itemStyle} to="/login">
              Log in
            </NavLink>
          </li>
          <li>
            <NavLink className={itemStyle} to="/signup">
              Sign up
            </NavLink>
          </li>
        </ul>
      </div>
      <ThemeToggle />
    </div>
  );
}
