import React from "react";

function EmptyVideo() {
  return (
    <section className="flex h-[60vh] w-full items-center justify-center pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
      <div className="w-full max-w-md px-4 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-purple-900/30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-8 w-8 text-red-500 dark:text-purple-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
            />
          </svg>
        </div>
        
        <h3 className="mb-3 text-xl font-bold text-gray-800 dark:text-white">
          No videos found
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          We couldn't find any videos matching your request. <br />
          Try searching for something different.
        </p>
      </div>
    </section>
  );
}

export default EmptyVideo;