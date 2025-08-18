import React from "react";
import { useNavigate } from "react-router-dom";

function MyChannelEmptyVideo() {
  const navigate = useNavigate();
  
  return (
    <div className="flex h-full min-h-[50vh] items-center justify-center p-6">
      <div className="w-full max-w-md rounded-xl bg-white/50 p-8 text-center shadow-lg backdrop-blur-sm dark:bg-gray-800/50">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-purple-900/50">
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
        
        <h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-white">
          No videos uploaded yet
        </h3>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Your channel doesn't have any videos. Upload your first video to get started!
        </p>
        
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="inline-flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2.5 font-medium text-white shadow-md transition-all hover:bg-red-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:bg-purple-600 dark:hover:bg-purple-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Upload Video
        </button>
      </div>
    </div>
  );
}

export default MyChannelEmptyVideo;