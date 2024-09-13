import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import { TDispatch, TState } from "../redux/store";
import { closeSideBar } from "../redux/uiSlice";
import { Avatar, ListItemIcon } from "@mui/material";
import { IoMdPerson } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { LiaFlagUsaSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

export default function SideBar() {
  const open = useSelector((state: TState) => state.ui.sideBar);
  const user = useSelector((state: TState) => state.user.user);
  const dispatch: TDispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const currentLanguage = i18n.language;

  const handleClose = () => dispatch(closeSideBar());

  const LogOutHandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    location.reload();
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar");
  };

  return (
    <Drawer
      open={open}
      anchor={currentLanguage === "en" ? "right" : "left"}
      onClose={handleClose}
      PaperProps={{
        sx: {
          bgcolor: "background.default",
          color: "text.primary",
          ".MuiDrawer-paper": {
            backgroundColor: "dark:bg-gray-800",
            color: "dark:text-white",
          },
        },
      }}
    >
      {/* User Information Section */}
      <div className="flex items-center pb-4 p-2 gap-3 dark:bg-gray-800 dark:text-white">
        <Avatar src={user?.profile_image || ""} />
        <div>
          <p className="font-semibold text-gray-700 dark:text-gray-200">
            {user?.name}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user?.username}
          </p>
        </div>
      </div>

      {/* Drawer List Section */}
      <Box
        className="dark:bg-gray-800 dark:text-white h-full"
        sx={{ width: 250 }}
        role="presentation"
        onClick={handleClose}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="text-gray-700 dark:text-gray-200">
                <IoMdPerson />
              </ListItemIcon>
              <ListItemText
                onClick={() => navigate("/profile")}
                primary={t("profile")}
                className="text-gray-700 dark:text-gray-200"
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={toggleLanguage}>
              <ListItemIcon className="text-gray-700 dark:text-gray-200">
                <LiaFlagUsaSolid />
              </ListItemIcon>
              <ListItemText
                primary={t("language")}
                className="text-gray-700 dark:text-gray-200"
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="text-gray-700 dark:text-gray-200">
                <CiLogout />
              </ListItemIcon>
              <ListItemText
                onClick={LogOutHandler}
                primary={t("logout")}
                className="text-gray-700 dark:text-gray-200"
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
