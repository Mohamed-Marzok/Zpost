import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainPage() {
  return (
    <div className="flex  flex-col h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
}
