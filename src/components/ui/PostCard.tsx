import { useState } from "react";
import { Post } from "../../interfaces";
import Comments from "../Comments";
import PostEditDeleteBtn from "../PostEditDeleteBtn";
import * as React from "react";
import { useSelector } from "react-redux";
import { TState } from "../../redux/store";

// Define the props interface
interface IProps {
  post: Post;
}

export default function PostCard({ post }: IProps) {
  const [openComments, setOpenComments] = useState(false);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const user = useSelector((state: TState) => state.user.user);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg  my-4 overflow-y-auto overflow-x-hidden relative">
      {!openComments ? (
        <>
          {user?.id === post.author.id ? (
            <PostEditDeleteBtn
              anchorRef={anchorRef}
              handleClose={handleClose}
              handleListKeyDown={handleListKeyDown}
              open={open}
              handleToggle={handleToggle}
              postId={post.id}
            />
          ) : null}
          {/* Post image */}
          {Object.keys(post.image).length > 0 ? (
            <img
              className="w-full h-72 object-cover"
              src={post.image}
              alt="Post"
            />
          ) : null}

          <div className="p-4">
            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              {post.title || "Untitled"}
            </h2>

            {/* Body */}
            <p className="text-gray-600 dark:text-gray-300 mb-4">{post.body}</p>

            {/* Author section */}
            <div className="flex items-center">
              <img
                className="w-10 h-10 rounded-full object-cover mr-3"
                src={
                  post?.author?.profile_image &&
                  Object.keys(post.author.profile_image).length !== 0
                    ? post.author.profile_image
                    : "http://tarmeezacademy.com/images/users/pScJVTfbX3aT9vK.jpg"
                }
                alt={`${
                  post?.author?.name || "Default User"
                }'s profile picture`}
              />
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-200">
                  {post.author.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {post.created_at}
                </p>
              </div>
            </div>

            {/* Comments and Tags */}
            <div className="mt-4 flex items-center justify-between ">
              <p
                className="text-gray-600 dark:text-gray-300 cursor-pointer"
                onClick={() => setOpenComments(true)}
              >
                Comments: {post.comments_count}
              </p>
              {/* Tags */}
              <div className="flex space-x-2">
                {post.tags.length > 0 ? (
                  post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 dark:bg-blue-600 text-blue-600 dark:text-blue-100 text-sm font-semibold px-2 py-1 rounded"
                    >
                      #{tag.name}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 dark:text-gray-400">
                    No Tags
                  </span>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <Comments postId={post.id} setOpenComments={setOpenComments} />
        </>
      )}
    </div>
  );
}
