import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/postsSlice";
import { TDispatch, TState } from "../redux/store";
import PostCard from "./ui/PostCard";
import { useEffect, useMemo, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { useTheme } from "@mui/material/styles";
import SkeletonPost from "./ui/SkeletonPost";
import InternetFailedPage from "../pages/InternetFaildPage";
import { useLocation } from "react-router-dom";

export default function Posts() {
  let posts = useSelector((state: TState) => state.posts.posts);
  const isLoading = useSelector((state: TState) => state.posts.isLoading);
  const error = useSelector((state: TState) => state.posts.error);
  const user = useSelector((state: TState) => state.user.user);
  const meta = useSelector((state: TState) => state.posts.meta) || {
    last_page: 1,
  };
  const [currentPage, setCurrentPage] = useState<number>(1);
  const dispatch: TDispatch = useDispatch();
  const theme = useTheme();
  const location = useLocation().pathname;
  if (location === "/profile") {
    posts = posts.filter((post) => post.author.id === user?.id);
  }
  useEffect(() => {
    dispatch(getPosts(currentPage));
  }, [currentPage, dispatch]);

  const postsList = useMemo(() => {
    return posts.map((post) => <PostCard post={post} key={post.id} />);
  }, [posts]);

  return (
    <div>
      {!error ? (
        <>
          {!isLoading ? (
            <>
              {postsList}
              {location === "/profile" ? null : (
                <Pagination
                  className="w-full flex justify-center"
                  count={meta.last_page}
                  shape="rounded"
                  page={currentPage}
                  onChange={(_, page) => {
                    setCurrentPage(page);
                    window.scrollTo(0, 0);
                  }}
                  sx={{
                    color: theme.palette.mode === "dark" ? "#fff" : "#000",
                    "& .MuiPaginationItem-root": {
                      color: theme.palette.mode === "dark" ? "#fff" : "#000",
                    },
                  }}
                />
              )}
            </>
          ) : (
            <SkeletonPost />
          )}
        </>
      ) : (
        <InternetFailedPage />
      )}
    </div>
  );
}
