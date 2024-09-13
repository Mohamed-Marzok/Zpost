export default function InternetFailedPage() {
  const handleRetry = () => {
    window.location.reload(); // This will reload the page to retry the connection
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-sky-500 text-white">
      {/* Icon or Image representing failed connection */}
      <div className="mb-4">
        <svg
          className="w-24 h-24"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 3l18 18M5.829 5.828A10.97 10.97 0 0112 2a10.97 10.97 0 016.171 1.828M15 10l4.838 4.838A10.97 10.97 0 0122 12a10.97 10.97 0 00-1.828-6.171M9 14a3 3 0 114.2 4.2M12 22a10.97 10.97 0 006.171-1.828M12 2v2m0 16v2m-8-8H2m18 0h2"
          ></path>
        </svg>
      </div>

      {/* Message */}
      <h1 className="text-3xl font-bold mb-2">No Internet Connection</h1>
      <p className="mb-4 text-center">
        It seems like your internet connection is lost. Please check your
        network and try again.
      </p>

      {/* Retry Button */}
      <button
        onClick={handleRetry}
        className="bg-white text-sky-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
      >
        Retry
      </button>
    </div>
  );
}
