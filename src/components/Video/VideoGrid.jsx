import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { EmptyVideo } from "../index";
import { formatTimestamp, formatVideoDuration } from "../../helpers/formatFigures";

function VideoGrid({ 
  videos = [], 
  loading = true, 
  fetching = false, 
  gridClassName = "", 
  itemClassName = "" 
}) {
  if (loading) {
    return (
      <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 ${gridClassName}`}>
          {[...Array(12)].map((_, index) => (
            <div key={`skeleton-${index}`} className={`w-full ${itemClassName}`}>
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
            <li 
              key={video._id} 
              className="group w-full transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="relative mb-3 w-full pt-[56.25%] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                <Link 
                  to={`/watch/${video._id}`}
                  className="absolute inset-0 h-full w-full"
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="h-full w-full object-cover transition-opacity group-hover:opacity-90"
                    loading="lazy"
                  />
                  <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs text-white">
                    {formatVideoDuration(video.duration)}
                  </span>
                </Link>
              </div>
              
              <div className="flex gap-3">
                <Link 
                  to={`/user/${video.owner?.username}`} 
                  className="h-9 w-9 shrink-0 hover:opacity-80 transition-opacity"
                >
                  <img
                    src={video.owner?.avatar}
                    alt={video.owner?.fullName}
                    className="h-full w-full rounded-full object-cover"
                    loading="lazy"
                  />
                </Link>
                
                <div className="flex-1 min-w-0">
                  <h3 className="line-clamp-2 font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                    <Link 
                      to={`/watch/${video._id}`}
                      className="hover:no-underline"
                    >
                      {video.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <Link 
                      to={`/user/${video.owner?.username}`} 
                      className="hover:text-gray-900 dark:hover:text-white hover:underline"
                    >
                      {video.owner?.fullName}
                    </Link>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
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
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-400 border-t-purple-500 dark:border-t-purple-400"></div>
            Loading more videos...
          </div>
        </div>
      )}
    </section>
  );
}

VideoGrid.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired,
      views: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      createdAt: PropTypes.string.isRequired,
      owner: PropTypes.shape({
        username: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        fullName: PropTypes.string.isRequired,
      }).isRequired,
    })
  ),
  loading: PropTypes.bool,
  fetching: PropTypes.bool,
  gridClassName: PropTypes.string,
  itemClassName: PropTypes.string,
};

export default VideoGrid;