import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        404
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
        Oops! The page you are looking for cannot be found.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
