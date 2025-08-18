import React from "react";
import { Link } from "react-router-dom";
import { EmptyVideo } from "../index";
import { formatTimestamp, formatVideoDuration } from "../../helpers/formatFigures";

function VideoGrid({ videos = [], loading = true, fetching = false, gridClassName = "", itemClassName = "" }) {
  if (loading) {
    return (
      <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 ${gridClassName}`}>
          {[...Array(12)].map((_, index) => (
            <div key={index} className={`w-full ${itemClassName}`}>
              <div className="relative mb-3 w-full pt-[56.25%] rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              <div className="flex gap-3">
                <div className="h-9 w-9 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 rounded bg-gray-300 dark:bg-gray-600 animate-pulse w-3/4"></div>
                  <div className="h-3 rounded bg-gray-200 dark:bg-gray-700 animate-pulse w-1/2"></div>
                  <div className="h-3 rounded bg-gray-200 dark:bg-gray-700 animate-pulse w-2/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="scrollable_feed_screen" className={`w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0 ${gridClassName}`}>
      {videos?.length > 0 ? (
        <ul className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 ${itemClassName}`}>
          {videos.map((video) => (
            <li key={video._id} className="group w-full transition-transform duration-200 hover:scale-[1.02]">
              <div className="relative mb-3 w-full pt-[56.25%] rounded-xl overflow-hidden">
                <Link to={`/watch/${video._id}`}>
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="absolute inset-0 h-full w-full object-cover transition-opacity group-hover:opacity-90"
                  />
                </Link>
                <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs text-white">
                  {formatVideoDuration(video.duration)}
                </span>
              </div>
              <div className="flex gap-3">
                <Link 
                  to={`/user/${video.owner?.username}`} 
                  className="h-9 w-9 shrink-0"
                >
                  <img
                    src={video.owner?.avatar}
                    alt={video.owner?.fullName}
                    className="h-full w-full rounded-full object-cover"
                  />
                </Link>
                <div>
                  <h3 className="line-clamp-2 font-medium text-gray-900 dark:text-white">
                    <Link to={`/watch/${video._id}`}>{video.title}</Link>
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <Link to={`/user/${video.owner?.username}`} className="hover:text-gray-900 dark:hover:text-white">
                      {video.owner?.fullName}
                    </Link>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {video.views} views • {formatTimestamp(video.createdAt)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyVideo />
      )}

      {fetching && (
        <div className="flex items-center justify-center py-6">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-400 border-t-purple-500"></div>
            Loading more videos...
          </div>
        </div>
      )}
    </section>
  );
}

export default VideoGrid;