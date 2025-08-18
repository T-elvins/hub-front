import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { icons } from "../assets/icons.jsx";
import DarkModeToggle from "./Atoms/Darkmode.jsx";

function Aside() {
  const username = useSelector((state) => state.auth.userData?.username);

  const NavElements = [
    {
      name: "Home",
      route: "",
      icon: icons.Home,
    },
    {
      name: "Tweets",
      route: "tweets",
      icon: icons.Tweets,
    },
    {
      name: "Liked Videos",
      route: "feed/liked",
      className: "hidden sm:block",
      icon: icons.Like,
    },
    {
      name: "History",
      route: "feed/history",
      className: username ? "hidden sm:block" : "hidden",
      icon: icons.history,
    },
    {
      name: "Subscriptions",
      route: `/channel/${username}/subscribed`,
      className: username ? "hidden sm:block" : "hidden",
      icon: icons.Subscription,
    },
    {
      name: "My Content",
      route: `channel/${username}`,
      icon: icons.MyContent,
    },
    {
      name: "Playlists",
      route: `/channel/${username}/playlists`,
      className: username ? "hidden sm:block" : "hidden",
      icon: icons.folder,
    },
    {
      name: "Admin",
      route: "/admin/dashboard",
      className: username ? "" : "hidden",
      icon: icons.Admin,
    },
    {
      name: "Subscribers",
      route: "feed/subscribers",
      className: "hidden sm:block",
      icon: icons.Subscribers,
    },
    {
      name: "Support",
      route: "support",
      className: "hidden sm:block mt-auto",
      icon: icons.support,
    },
    {
      name: "Settings",
      route: "settings",
      className: username ? "" : "hidden",
      icon: icons.Settings,
    },
  ];

  return (
    <aside className="fixed inset-x-0 bottom-0 z-40 w-full border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 sm:sticky sm:inset-y-0 sm:h-screen sm:w-16 sm:border-r sm:border-t-0 sm:hover:w-64 lg:w-64 transition-all duration-200 ease-in-out">
      <div className="flex h-full flex-col px-2 py-4 sm:px-3">
        {/* Dark Mode Toggle - Mobile */}
        <div className="sm:hidden flex justify-center mb-4">
          <DarkModeToggle />
        </div>

        {/* Navigation Links */}
        <ul className="flex justify-around sm:flex-col sm:justify-start sm:gap-1">
          {/* Dark Mode Toggle - Desktop */}
          <li className="hidden sm:block mb-4">
            <DarkModeToggle />
          </li>

          {NavElements.map((item) => (
            <li key={item.route} className={item.className}>
              <NavLink
                to={item.route}
                end
                className={({ isActive }) =>
                  `flex items-center rounded-lg p-3 sm:p-2.5 text-sm font-medium transition-colors
                  ${
                    isActive
                      ? "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`
                }
              >
                <span className="flex h-6 w-6 items-center justify-center shrink-0 sm:mr-3 lg:mr-3">
                  {item.icon}
                </span>
                <span className="hidden sm:block sm:opacity-0 sm:group-hover:opacity-100 lg:opacity-100 transition-opacity">
                  {item.name}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Aside;