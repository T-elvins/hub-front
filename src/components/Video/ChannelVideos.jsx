import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { EmptyChannelVideo, MyChannelEmptyVideo } from "../index";
import { getAllVideos } from "../../app/Slices/videoSlice";
import { formatTimestamp, formatVideoDuration } from "../../helpers/formatFigures";

function ChannelVideos({ owner = false }) {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { username } = useParams();
  const currentUser = useSelector((state) => state.auth.userData);
  const userId = useSelector((state) => state.user?.userData?._id);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const targetUserId = owner ? currentUser?._id : userId;
        if (!targetUserId) return;

        const res = await dispatch(getAllVideos(targetUserId));
        if (res.payload) {
          setVideos(res.payload);
        } else {
          setVideos([]);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
        setError("Failed to load videos. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, [username, userId, dispatch, owner, currentUser]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {[...Array(8)].map((_, index) => (
          <div key={`skeleton-${index}`} className="w-full animate-pulse">
            <div className="relative mb-3 w-full pt-[56.25%] rounded-xl bg-gray-200 dark:bg-gray-700/80"></div>
            <div className="flex gap-3 mt-2">
              <div className="h-9 w-9 rounded-full bg-gray-300 dark:bg-gray-600/80"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 rounded bg-gray-300 dark:bg-gray-600/80 w-3/4"></div>
                <div className="h-3 rounded bg-gray-200 dark:bg-gray-700/80 w-1/2"></div>
                <div className="h-3 rounded bg-gray-200 dark:bg-gray-700/80 w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-red-500 text-4xl mb-4">⚠️</div>
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
          Error loading videos
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (videos.length === 0) {
    return owner ? <MyChannelEmptyVideo /> : <EmptyChannelVideo />;
  }

  return (
    <div className="p-4 sm:p-6">
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${
          videos.length < 4 ? "sm:grid-cols-2 lg:grid-cols-3" : ""
        }`}
      >
        {videos.map((video) => (
          <div
            key={video._id}
            className="group w-full transition-all duration-200 hover:scale-[1.02] hover:shadow-lg dark:hover:shadow-gray-700/50 rounded-xl"
          >
            <Link to={`/watch/${video._id}`} className="block hover:no-underline">
              <div className="relative mb-3 w-full pt-[56.25%] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="absolute inset-0 h-full w-full object-cover transition-opacity group-hover:opacity-90"
                  loading="lazy"
                />
                <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs text-white">
                  {formatVideoDuration(video.duration)}
                </span>
              </div>
              <div className="flex gap-3 p-2">
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
                  <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                    {video.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Link
                      to={`/user/${video.owner?.username}`}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:underline"
                    >
                      {video.owner?.fullName}
                    </Link>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {video.views} views · {formatTimestamp(video.createdAt)}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

ChannelVideos.propTypes = {
  owner: PropTypes.bool,
};

export default ChannelVideos;