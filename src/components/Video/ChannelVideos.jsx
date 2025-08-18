import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { EmptyChannelVideo, MyChannelEmptyVideo } from "../index";
import { getAllVideos } from "../../app/Slices/videoSlice";
import { formatTimestamp, formatVideoDuration } from "../../helpers/formatFigures";

function ChannelVideos({ owner = false }) {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { username } = useParams();
  const currentUser = useSelector((state) => state.auth.userData);
  let userId = useSelector((state) => state.user?.userData?._id);

  useEffect(() => {
    if (owner) {
      userId = currentUser?._id;
    }
    if (!userId) return;
    
    const fetchVideos = async () => {
      try {
        const res = await dispatch(getAllVideos(userId));
        setVideos(res.payload || []);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, [username, userId, dispatch, owner, currentUser]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="w-full animate-pulse">
            <div className="relative mb-3 w-full pt-[56.25%] rounded-xl bg-gray-200 dark:bg-gray-700"></div>
            <div className="flex gap-3 mt-2">
              <div className="h-9 w-9 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 rounded bg-gray-300 dark:bg-gray-600 w-3/4"></div>
                <div className="h-3 rounded bg-gray-200 dark:bg-gray-700 w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (videos.length === 0) {
    return owner ? <MyChannelEmptyVideo /> : <EmptyChannelVideo />;
  }

  return (
    <div className="p-4">
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ${
        videos.length < 4 ? "justify-start" : ""
      }`}>
        {videos.map((video) => (
          <div key={video._id} className="group w-full transition-transform duration-200 hover:scale-[1.02]">
            <Link to={`/watch/${video._id}`} className="block">
              <div className="relative mb-3 w-full pt-[56.25%] rounded-xl overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="absolute inset-0 h-full w-full object-cover transition-opacity group-hover:opacity-90"
                />
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
                  <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
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

export default ChannelVideos;