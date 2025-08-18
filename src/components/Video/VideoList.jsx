import React from "react";
import { formatTimestamp, formatVideoDuration } from "../../helpers/formatFigures";
import { Link, useNavigate } from "react-router-dom";
import { icons } from "../../assets/icons";

function VideoView({ videos = [], loading = true, fetching = false }) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
        <div className="grid gap-6 p-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="animate-pulse w-full max-w-3xl gap-x-4 md:flex">
              <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
                <div className="w-full pt-[56%]">
                  <div className="absolute inset-0 rounded-xl bg-gray-200 dark:bg-gray-700" />
                </div>
              </div>
              <div className="flex gap-x-3 md:w-7/12">
                <div className="h-10 w-10 shrink-0 md:hidden">
                  <div className="h-full w-full rounded-full bg-gray-300 dark:bg-gray-600" />
                </div>
                <div className="w-full space-y-2">
                  <div className="h-6 w-3/4 rounded bg-gray-300 dark:bg-gray-600" />
                  <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="flex items-center gap-x-3">
                    <div className="mt-1 hidden h-9 w-9 shrink-0 rounded-full bg-gray-300 dark:bg-gray-600 md:block" />
                    <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
                  </div>
                  <div className="hidden h-4 w-full rounded bg-gray-200 dark:bg-gray-700 md:block" />
                  <div className="hidden h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700 md:block" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
      <ul className="grid gap-4 p-4">
        {videos?.length > 0 ? (
          videos.map((video) => (
            <li 
              key={video._id} 
              className="w-full rounded-xl transition-all hover:bg-gray-100 dark:hover:bg-gray-800/50"
            >
              <Link to={`/watch/${video._id}`} className="block">
                <div className="w-full max-w-3xl gap-x-4 md:flex lg:max-w-4xl">
                  {/* Thumbnail */}
                  <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
                    <div className="w-full pt-[56%]">
                      <div className="absolute inset-0 overflow-hidden rounded-xl">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs text-white">
                          {formatVideoDuration(video.duration)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Video Info */}
                  <div className="flex gap-x-3 md:w-7/12">
                    {/* Mobile Avatar */}
                    <div className="h-10 w-10 shrink-0 md:hidden">
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/user/${video.owner?.username}`);
                        }}
                        className="h-full w-full"
                      >
                        <img
                          src={video.owner?.avatar}
                          alt={video.owner?.username}
                          className="h-full w-full rounded-full object-cover"
                        />
                      </button>
                    </div>
                    
                    <div className="w-full">
                      <h3 className="mb-1 line-clamp-2 font-medium text-gray-900 dark:text-white">
                        {video.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {video.views} views · {formatTimestamp(video.createdAt)}
                      </p>
                      
                      {/* Desktop Avatar & Channel Info */}
                      <div className="mt-2 flex items-center gap-x-3">
                        <div className="hidden h-9 w-9 shrink-0 md:block">
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              navigate(`/user/${video.owner?.username}`);
                            }}
                            className="h-full w-full"
                          >
                            <img
                              src={video.owner?.avatar}
                              alt={video.owner?.username}
                              className="h-full w-full rounded-full object-cover"
                            />
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {video.owner?.fullName}
                        </p>
                      </div>
                      
                      <p className="mt-2 hidden text-sm text-gray-600 dark:text-gray-400 md:line-clamp-2">
                        {video.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 text-gray-400 dark:text-gray-500">
              {icons.video}
            </div>
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
              No videos found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try different search terms
            </p>
          </div>
        )}

        {fetching && (
          <div className="flex items-center justify-center gap-2 py-4 text-gray-500 dark:text-gray-400">
            <span className="animate-spin">{icons.loading}</span>
            Loading more videos...
          </div>
        )}
      </ul>
    </section>
  );
}

export default VideoView;