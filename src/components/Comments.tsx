import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TDispatch, TState } from "../redux/store";
import { getPost } from "../redux/postSlice";
import { addComment } from "../redux/commentsSlice";

interface IProps {
  postId: number;
  setOpenComments: (open: boolean) => void;
}

interface Comment {
  id: number;
  body: string;
  author: {
    name: string;
    username: string;
    profile_image?: string;
  };
}

export default function Comments({ postId, setOpenComments }: IProps) {
  const dispatch: TDispatch = useDispatch();

  const [commentText, setCommentText] = useState<{ body: string }>({
    body: "",
  });
  const comments = useSelector(
    (state: TState) => state.post.post.comments
  ) as Comment[];

  useEffect(() => {
    dispatch(getPost(postId));
  }, [postId, dispatch]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText({ body: e.target.value });
  };

  const handleSendComment = () => {
    if (commentText.body.trim()) {
      dispatch(addComment({ postId, commentText }));
      setCommentText({ body: "" });
    }
  };

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
      <div className="mt-4 h-96 mb-12 overflow-y-auto custom-scrollbar scroll-m-3.5">
        {comments?.length > 0 ? (
          comments.map((com) => (
            <div
              key={com.id}
              className="mb-4 border-b border-gray-300 dark:border-gray-700 pb-4"
            >
              <div className="flex items-center mb-2">
                <img
                  className="w-10 h-10 rounded-full object-cover mr-3"
                  src={
                    com?.author?.profile_image &&
                    Object.keys(com.author.profile_image).length !== 0
                      ? com.author.profile_image
                      : "http://tarmeezacademy.com/images/users/pScJVTfbX3aT9vK.jpg"
                  }
                  alt={`${
                    com?.author?.name || "Default User"
                  }'s profile picture`}
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

        <div className="flex w-full items-center absolute bottom-0 left-0 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <input
            className="flex-grow rounded-lg border border-gray-300 shadow-lg p-2 pl-5 outline-none caret-sky-600 focus:border-sky-700 focus:ring-2 focus:ring-sky-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white transition-colors duration-300 ease-in-out"
            placeholder="Type your Comment..."
            value={commentText.body}
            onChange={handleCommentChange}
          />
          <button
            className="ml-2 px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-300 ease-in-out"
            onClick={handleSendComment}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
