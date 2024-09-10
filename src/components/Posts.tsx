import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/postsSlice";
import { TDispatch, TState } from "../redux/store";
import PostCard from "./ui/PostCard";
import { useEffect, useMemo, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { useTheme } from "@mui/material/styles";

export default function Posts() {
  const posts = useSelector((state: TState) => state.posts.posts);
  const meta = useSelector((state: TState) => state.posts.meta) || {
    last_page: 1,
  };
  const [currentPage, setCurrentPage] = useState<number>(1);
  const dispatch: TDispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    dispatch(getPosts(currentPage));
  }, [currentPage, dispatch]);

  const postsList = useMemo(() => {
    return posts.map((post) => <PostCard post={post} key={post.id} />);
  }, [posts]);

  return (
    <div>
      {postsList}
      <Pagination
        className="w-full flex justify-center"
        count={meta.last_page}
        shape="rounded"
        page={currentPage}
        onChange={(_, page) => setCurrentPage(page)}
        sx={{
          color: theme.palette.mode === "dark" ? "#fff" : "#000",
          "& .MuiPaginationItem-root": {
            color: theme.palette.mode === "dark" ? "#fff" : "#000",
          },
        }}
      />
    </div>
  );
}
