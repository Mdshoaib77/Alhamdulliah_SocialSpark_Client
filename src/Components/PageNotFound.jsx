import React from "react";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="w-screen h-screen ">
        <title>Page Not Found</title>
      <div className="w-8/12 mx-auto pt-20 items-center flex flex-col justify-center  text-center font-sans text-gray-900 ">
        <img
          src="https://thumbs.dreamstime.com/b/magnifying-glass-focusing-small-tree-green-moss-focuses-tiny-growing-vibrant-image-highlights-beauty-nature-406643439.jpg"
          alt="Magnifying glass on map"
          className="w-10/12 lg:w-8/12 rounded-lg mb-6"
        />
        <h1 className="text-6xl font-extrabold text-green-500 mb-2">404</h1>
        <h2 className="text-lg font-semibold mb-3 dark:text-gray-200">Page Not Found</h2>
        <p className="text-sm text-gray-500 mb-8 px-4 w-80%">
          Oops! The page you're looking for seems to have been misplaced. It
          might have been moved, renamed, or is taking a short break. Let's get
          you back to a clean slate.
        </p>
        <Link
          to="/"
          className="bg-green-500 text-white font-semibold text-sm px-6 py-4 rounded-md hover:bg-green-600 transition-colors">
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
