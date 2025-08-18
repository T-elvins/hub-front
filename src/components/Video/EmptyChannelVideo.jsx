import React from "react";

function EmptyChannelVideo() {
  return (
    <div className="flex min-h-[300px] items-center justify-center p-6">
      <div className="w-full max-w-md rounded-xl bg-white/50 p-8 text-center shadow-sm backdrop-blur-sm dark:bg-gray-800/50">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-purple-900/30">
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
          Channel has no videos
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          This channel hasn't uploaded any videos yet. <br />
          Explore other channels to find more content.
        </p>
      </div>
    </div>
  );
}

export default EmptyChannelVideo;