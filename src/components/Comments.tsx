import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TDispatch, TState } from "../redux/store";
import { getPost } from "../redux/postSlice";
import Button from "@mui/material/Button";

interface IProps {
  postId: number;
  setOpenComments: (open: boolean) => void;
}

export default function Comments({ postId, setOpenComments }: IProps) {
  const dispatch: TDispatch = useDispatch();
  const comments = useSelector((state: TState) => state.post.post.comments);

  useEffect(() => {
    dispatch(getPost(postId));
  }, [postId, dispatch]);

  return (
    <div className="p-4 overflow-hidden relative">
      <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 z-10 border-b border-gray-300 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <button
            className="text-blue-600 font-bold dark:text-blue-400"
            onClick={() => setOpenComments(false)}
          >
            ⇐
          </button>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Comments
          </h2>
        </div>
      </div>

      {/* Comment Content */}
      <div className="mt-4 h-96 overflow-y-auto custom-scrollbar">
        {comments?.length > 0 ? (
          comments.map((com) => (
            <div
              key={com.id}
              className="mb-4 border-b border-gray-300 dark:border-gray-700 pb-4"
            >
              <div className="flex items-center mb-2">
                <img
                  className="w-8 h-8 rounded-full object-cover mr-2"
                  src={
                    typeof com.author.profile_image === "string" &&
                    com.author.profile_image
                      ? com.author.profile_image
                      : "/default-avatar.png"
                  }
                  alt={com.author.name}
                />
                <div>
                  <p className="font-semibold text-gray-700 dark:text-gray-200">
                    {com.author.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {com.author.username}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-wrap whitespace-break-spaces">
                {com.body}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No comments available
          </p>
        )}

        <div className="flex w-full items-center absolute bottom-0 left-0 rounded-lg">
          <input className="rounded-lg border shadow-lg w-full p-2 pl-5 outline-none caret-sky-600 focus:border-sky-700 dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
          <Button className="rounded-lg" variant="contained">
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
