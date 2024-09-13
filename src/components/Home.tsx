import SideBar from "../components/SideBar";
import Posts from "./Posts";
import AddBtn from "./ui/AddBtn";

export default function Home() {
  return (
    <div className="relative " style={{ transform: "translatey(64px)" }}>
      <SideBar />
      <Posts />
      <AddBtn />
    </div>
  );
}
