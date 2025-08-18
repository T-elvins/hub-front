import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EditPersonalInfo, EditChannelInfo, ChangePassword } from "../components/index";
import { useDispatch } from "react-redux";
import { uploadAvatar, uploadCoverImage } from "../app/Slices/authSlice";

function Settings() {
  const [currentTab, setCurrentTab] = useState(0);
  const userData = useSelector((state) => state.auth?.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0 dark:bg-gray-900 bg-white min-h-screen">
      {/* Cover Image Section */}
      <div className="relative w-full h-48 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-700 dark:to-pink-700">
        {userData?.coverImage && (
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src={userData.coverImage} 
              alt="cover" 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        {/* Cover Image Upload */}
        <form
          name="cover-image-form"
          className="absolute right-4 bottom-4"
        >
          <input
            type="file"
            onChange={() =>
              dispatch(uploadCoverImage({ 
                data: new FormData(document.forms["cover-image-form"]) 
              }))
            }
            id="cover-image"
            name="coverImage"
            className="hidden"
          />
          <label
            htmlFor="cover-image"
            className="flex items-center justify-center h-10 w-10 cursor-pointer rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 text-[#ae7aff] hover:bg-white dark:hover:bg-gray-700 transition-all shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
          </label>
        </form>
      </div>

      <div className="px-4 sm:px-6 pb-4">
        {/* Profile Header */}
        <div className="flex flex-wrap items-end gap-4 pb-4 pt-6 relative">
          {/* Avatar */}
          <div className="relative -mt-16 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-4 border-white dark:border-gray-900 shadow-lg">
            <img 
              src={userData?.avatar} 
              alt="Profile" 
              className="h-full w-full object-cover" 
            />
            <form
              name="avatar-image-form"
              className="absolute right-0 bottom-0"
            >
              <input
                onChange={() =>
                  dispatch(
                    uploadAvatar({ 
                      data: new FormData(document.forms["avatar-image-form"]) 
                    })
                  )
                }
                type="file"
                name="avatar"
                id="profile-image"
                className="hidden"
              />
              <label
                htmlFor="profile-image"
                className="flex items-center justify-center h-8 w-8 cursor-pointer rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-1.5 text-[#ae7aff] hover:bg-white dark:hover:bg-gray-700 transition-all shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
              </label>
            </form>
          </div>
          
          {/* Channel Info */}
          <div className="mr-auto">
            <h1 className="text-2xl font-bold dark:text-white">{userData?.fullName}</h1>
            <p className="text-gray-500 dark:text-gray-400">@{userData?.username}</p>
          </div>
          
          {/* View Channel Button */}
          <button
            onClick={() => navigate(`/channel/${userData?.username}`)}
            className="rounded-lg group flex items-center gap-x-2 bg-red-500 dark:bg-[#ae7aff] hover:bg-red-600 dark:hover:bg-[#9d6ae8] text-white px-4 py-2.5 font-medium transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
          >
            View Channel
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth="2" 
              stroke="currentColor" 
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="sticky top-[66px] z-10 bg-white dark:bg-gray-900 sm:top-[82px] border-b border-gray-200 dark:border-gray-700">
          <div className="flex">
            <button
              onClick={() => setCurrentTab(0)}
              className={`px-4 py-3 font-medium text-sm border-b-2 ${
                currentTab === 0
                  ? "border-[#ae7aff] dark:text-[#ae7aff] text-red-500"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              } transition-colors`}
            >
              Personal Information
            </button>
            <button
              onClick={() => setCurrentTab(1)}
              className={`px-4 py-3 font-medium text-sm border-b-2 ${
                currentTab === 1
                  ? "border-[#ae7aff] dark:text-[#ae7aff] text-red-500"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              } transition-colors`}
            >
              Channel Information
            </button>
            <button
              onClick={() => setCurrentTab(2)}
              className={`px-4 py-3 font-medium text-sm border-b-2 ${
                currentTab === 2
                  ? "border-[#ae7aff] dark:text-[#ae7aff] text-red-500"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              } transition-colors`}
            >
              Change Password
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="py-6">
          {currentTab === 0 && <EditPersonalInfo userData={userData} />}
          {currentTab === 1 && <EditChannelInfo userData={userData} />}
          {currentTab === 2 && <ChangePassword userData={userData} />}
        </div>
      </div>
    </section>
  );
}

export default Settings;