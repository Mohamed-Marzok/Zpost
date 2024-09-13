import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { Avatar, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { TDispatch, TState } from "../redux/store";
import { openSideBar } from "../redux/uiSlice";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import { LiaFlagUsaSolid } from "react-icons/lia";
// Dynamic class name function for NavLink
const itemStyle = ({ isActive }: { isActive: boolean }) =>
  `font-semibold ${isActive ? "underline text-sky-300" : ""}`;

export default function Navbar() {
  const user = useSelector((state: TState) => state.user.user);
  const token = useSelector((state: TState) => state.user.token);
  const dispatch: TDispatch = useDispatch();
  const { t } = useTranslation(); // Initialize the translation hook
  const currentLanguage = i18n.language;
  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar");
  };

  return (
    <div
      className={`flex justify-between bg-sky-700 p-4 text-white 2xl z-50 fixed left-0 right-0 top-0 shadow-lg`}
      style={{ direction: currentLanguage === "en" ? "ltr" : "rtl" }}
    >
      <div className="flex items-center md:w-1/5 justify-between gap-5">
        <p className="font-bold text-2xl">
          <Link to="/">{t("welcome")}</Link> {/* Translate "welcome" */}
        </p>
        <ul className="flex items-center text-xl  md:grow gap-5">
          <li>
            <NavLink
              className={itemStyle}
              style={{ whiteSpace: "nowrap" }}
              to="/"
            >
              {t("home")}
            </NavLink>
          </li>
          <li>
            <NavLink
              className={itemStyle}
              style={{ whiteSpace: "nowrap" }}
              to="/login"
            >
              {t("login")}
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex gap-3">
        <ThemeToggle />
        {token ? (
          <Avatar
            className="cursor-pointer"
            src={user?.profile_image}
            onClick={() => dispatch(openSideBar())}
          />
        ) : (
          <IconButton onClick={toggleLanguage}>
            <LiaFlagUsaSolid className="text-white" />
          </IconButton>
        )}
      </div>
    </div>
  );
}
