import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { channelProfile } from "../../app/Slices/userSlice";

function MyChannel() {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await dispatch(channelProfile(username));
        setProfile(res.payload);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [username, dispatch]);

  if (isLoading) {
    return (
      <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
        {/* Cover Image Skeleton */}
        <div className="relative h-48 w-full bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800 animate-pulse">
          <div className="absolute inset-0" />
        </div>

        <div className="px-4 pb-4">
          {/* Profile Info Skeleton */}
          <div className="flex flex-wrap items-end gap-4 pb-4 pt-6">
            <div className="relative -mt-16 h-28 w-28 rounded-full border-4 border-white dark:border-gray-900 bg-gray-300 dark:bg-gray-700 animate-pulse" />
            <div className="mr-auto space-y-2">
              <div className="h-6 w-48 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-40 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
            </div>
            <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse" />
          </div>

          {/* Tabs Skeleton */}
          <div className="sticky top-[66px] z-10 flex gap-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 sm:top-[82px]">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
            ))}
          </div>

          {/* Content Skeleton */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="aspect-video w-full rounded-xl bg-gray-300 dark:bg-gray-700 animate-pulse" />
                <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-3 w-1/2 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!profile) {
    return (
      <section className="flex h-[60vh] items-center justify-center w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Channel not found</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            The channel you're looking for doesn't exist or may have been removed.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
      {/* Cover Image */}
      <div className="relative h-48 w-full bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-700 dark:to-pink-700">
        {profile?.coverImage && (
          <img
            src={profile.coverImage}
            alt={profile.username}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </div>

      <div className="px-4 pb-4">
        {/* Channel Info */}
        <div className="flex flex-wrap items-end gap-4 pb-4 pt-6">
          <div className="relative -mt-16 h-28 w-28 rounded-full border-4 border-white dark:border-gray-900 overflow-hidden">
            <img
              src={profile.avatar}
              alt={profile.username}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mr-auto">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{profile.fullName}</h1>
            <p className="text-gray-600 dark:text-gray-400">@{profile.username}</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              {profile.subscribersCount} Subscribers • {profile.channelsSubscribedToCount} Subscribed
            </p>
          </div>
          <button
            onClick={() => navigate("/settings")}
            className="flex items-center gap-2 rounded-lg bg-purple-600 hover:bg-purple-700 px-4 py-2 text-white font-medium transition-colors shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
            Edit Profile
          </button>
        </div>

        {/* Tabs */}
        <div className="sticky top-[66px] z-10 flex gap-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 sm:top-[82px]">
          <NavLink
            to=""
            end
            className={({ isActive }) =>
              `px-4 py-2 font-medium text-sm border-b-2 ${
                isActive
                  ? "border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              } transition-colors`
            }
          >
            Videos
          </NavLink>
          <NavLink
            to="playlists"
            className={({ isActive }) =>
              `px-4 py-2 font-medium text-sm border-b-2 ${
                isActive
                  ? "border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              } transition-colors`
            }
          >
            Playlists
          </NavLink>
          <NavLink
            to="tweets"
            className={({ isActive }) =>
              `px-4 py-2 font-medium text-sm border-b-2 ${
                isActive
                  ? "border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              } transition-colors`
            }
          >
            Tweets
          </NavLink>
          <NavLink
            to="subscribed"
            className={({ isActive }) =>
              `px-4 py-2 font-medium text-sm border-b-2 ${
                isActive
                  ? "border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              } transition-colors`
            }
          >
            Subscribed
          </NavLink>
        </div>

        {/* Content */}
        <div className="mt-6">
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default MyChannel;