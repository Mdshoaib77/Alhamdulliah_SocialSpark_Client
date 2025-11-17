import React from "react";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="w-screen h-screen ">
        <title>Page Not Found</title>
      <div className="w-8/12 mx-auto pt-20 items-center flex flex-col justify-center  text-center font-sans text-gray-900 ">
        <img
          src="https://media.istockphoto.com/id/2175628207/photo/error-text-neon-light-on-black-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=JDIE4kgUI3BOLV9Q1tgcw1N5JxZ6Uz4pV74lffUh__4="
          alt="Magnifying glass on map"
          className="w-10/12 lg:w-8/12 rounded-lg mb-6"
        />
        <h1 className="text-6xl font-extrabold text-purple-800 mb-2">404</h1>
        <h2 className="text-lg font-semibold mb-3 dark:text-gray-200">Page Not Found</h2>
        <p className="text-sm text-gray-500 mb-8 px-4 w-80%">
          Oops! The page you're looking for seems to have been misplaced. It
          might have been moved, renamed, or is taking a short break. Let's get
          you back to a clean slate.
        </p>
        <Link
          to="/"
          className="bg-purple-800 text-white font-semibold text-sm px-6 py-4 rounded-md hover:bg-purple-800 transition-colors">
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
