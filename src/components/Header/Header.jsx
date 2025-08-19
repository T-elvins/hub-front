import React, { useRef, useState } from "react";
import { Logo, LogoutBtn } from "../index";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { icons } from "../../assets/icons";
import some from "../../assets/some.png";
import { DarkModeToggleforSmall } from "../Atoms/Darkmode";

function Header() {
  const { userData, status: authStatus } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const searchInputRef = useRef();
  const smallSearchInputRef = useRef();
  const [showHotVideos, setShowHotVideos] = useState(false);

  // Sample hot videos data
  const hotVideos = [
   
  ];

  const username = userData?.username;

  const HamburgerMenu = [
    
  ];

  const handleSearchQuery = (input) => {
    const searchQuery = input.trim();
    if (!searchQuery) {
      searchInputRef.current.focus();
      return;
    }
    navigate(`/results?search_query=${searchQuery}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-red-300/50 dark:border-white/20 dark:bg-[#121212] bg-white shadow-sm">
      {/* Enhanced Hot Videos Banner */}
      <div className="w-full bg-gradient-to-r from-fuchsia-900 via-purple-900 to-violet-900 py-3 px-4 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-500/20 to-transparent animate-shimmer"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNIDAgMCBMIDYwIDYwIE0gNjAgMCBMIDAgNjAiLz48L2c+PC9zdmc+')] opacity-10"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between relative z-10">
          <div className="flex items-center mb-2 sm:mb-0">
            <span className="mr-2 text-2xl animate-pulse">🔞</span>
            <span className="font-bold text-xl text-white drop-shadow-lg tracking-wide">
              HOT PORN VIDEOS INTERNATIONALLY:
            </span>
          </div>
          <div className="flex overflow-x-auto space-x-4 hide-scrollbar py-1">
            {hotVideos.map((video) => (
              <div
                key={video.id}
                className="flex-shrink-0 bg-gradient-to-r from-pink-700/80 to-purple-700/80 px-4 py-2 rounded-full flex items-center cursor-pointer transition-all duration-300 hover:from-pink-600 hover:to-purple-600 hover:scale-105 backdrop-blur-sm relative overflow-hidden group border border-white/20 shadow-lg"
                onClick={() => navigate(`/results?search_query=${video.title}`)}
              >
                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                {/* Glowing effect */}
                <div className="absolute inset-0 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300"></div>
                
                <span className="mr-2 text-lg transform group-hover:scale-110 transition-transform">{video.emoji}</span>
                <span className="text-sm font-medium whitespace-nowrap group-hover:font-semibold transition-all drop-shadow-md">
                  {video.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="mx-auto flex items-center py-2 w-full max-w-7xl px-4">
        <Logo />

        {/* Search (Desktop) */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearchQuery(searchInputRef.current.value);
          }}
          className="hidden sm:flex items-center flex-1 max-w-lg mx-6 relative"
        >
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search"
            className="w-full bg-transparent border border-zinc-300 dark:border-gray-600 rounded-full pl-10 pr-4 py-2 focus:ring-2 focus:ring-red-500/30 dark:focus:ring-[#ae7aff]/30 outline-none text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-300 transition-all"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300">
            {icons.search}
          </span>
        </form>

        {/* Search (Mobile) */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearchQuery(smallSearchInputRef.current.value);
          }}
          className="sm:hidden flex-1 relative ml-4"
        >
          <input
            ref={smallSearchInputRef}
            type="text"
            placeholder="Search"
            className="w-full bg-transparent border border-zinc-300 dark:border-gray-600 rounded-full pl-3 pr-10 py-2 outline-none text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-300 transition-all"
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300">
            {icons.search}
          </button>
        </form>

        {/* Hamburger for Mobile */}
        <div className="sm:hidden ml-4 flex items-center gap-4">
          <DarkModeToggleforSmall />
          <button className="flex flex-col justify-between h-5 w-6">
            <span className="block h-[2px] w-full bg-red-500 dark:bg-white rounded-full"></span>
            <span className="block h-[2px] w-full bg-red-500 dark:bg-white rounded-full"></span>
            <span className="block h-[2px] w-full bg-red-500 dark:bg-white rounded-full"></span>
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex items-center ml-auto gap-4">
          {HamburgerMenu.map((item) => (
            <li key={item.route} className={item.className}>
              <NavLink
                to={item.route}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActive ? "bg-red-500 text-white dark:bg-[#ae7aff] dark:text-black" : "text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`
                }
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Auth Buttons */}
        <div className="hidden sm:flex items-center ml-4 gap-2">
          {authStatus ? (
            <LogoutBtn />
          ) : (
            <>
              <Link to="/login">
                <button className="px-4 py-2 rounded-lg border border-red-500 dark:border-[#ae7aff] text-red-500 dark:text-[#ae7aff] hover:bg-red-500 hover:text-white dark:hover:bg-[#ae7aff] dark:hover:text-black transition-all">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-4 py-2 rounded-lg bg-red-500 dark:bg-[#ae7aff] text-white dark:text-black font-bold hover:bg-red-600 dark:hover:bg-[#9a66ec] transition-all">
                  Sign up
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Utilities */}
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .text-shadow {
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </header>
  );
}

export default Header;