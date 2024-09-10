// import SideBar from "../components/SideBar";
import Posts from "./Posts";
import AddBtn from "./ui/AddBtn";

export default function Home() {
  return (
    <div className="relative mt-20">
      {/* <SideBar /> */}
      <Posts />
      <AddBtn />
    </div>
  );
}
