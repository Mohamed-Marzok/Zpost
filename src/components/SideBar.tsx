import { NavLink } from "react-router-dom";

export default function SideBar() {
  const itemStyle = ({ isActive }: { isActive: boolean }) =>
    `font-semibold px-5  ${
      isActive ? "bg-sky-600 rounded-xl text-white " : ""
    }`;
  return (
    <div className="absolute top-0 left-0 bg-gray-100 py-4 pl-5 pr-20 h-full min-h-screen dark:bg-gray-600">
      <ul className="flex flex-col  text-xl justify-between md:grow gap-5">
        <li>
          <NavLink className={itemStyle} to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className={itemStyle} to="/profile">
            profile
          </NavLink>
        </li>
        <li>
          <NavLink className={itemStyle} to="/login">
            logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
