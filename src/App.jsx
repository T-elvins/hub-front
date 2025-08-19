import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCurrentUser } from "./app/Slices/authSlice";
import { healthCheck } from "./app/Slices/healthcheck";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import lightLoader from "./assets/lightLoader.gif";
import AgeVerification from "./components/AgeVerification"; // 👈 added

function App() {
  const dispatch = useDispatch();
  const [initialLoading, setInitialLoading] = useState(true);
  const darkMode = useSelector((state) => state.darkMode);

  // ✅ Default background set to black, then toggle works
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "#0a0a0a"; // dark black
      document.body.style.color = "#ffffff"; // text white in dark mode
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = "#ffffff"; // light white
      document.body.style.color = "#000000"; // text black in light mode
    }
  }, [darkMode]);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await dispatch(healthCheck());
        await dispatch(getCurrentUser());
      } catch (error) {
        toast.error("Initialization error. Please refresh the page.");
        console.error("Initialization error:", error);
      } finally {
        setInitialLoading(false);
      }
    };

    initializeApp();

    // Set up health check interval
    const healthCheckInterval = setInterval(() => {
      dispatch(healthCheck());
    }, 5 * 60 * 1000);

    return () => clearInterval(healthCheckInterval);
  }, [dispatch]);

  if (initialLoading) {
    return (
      <div className="h-screen w-full overflow-hidden bg-black flex items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-6">
          <img src={lightLoader} className="w-24 h-24" alt="Loading..." />
          <h1 className="text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
            Loading Hub Community...
          </h1>
          <p className="text-gray-400 text-sm animate-pulse">
            Preparing your experience
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
      {/* 👇 Age Verification modal */}
      <AgeVerification />

      {/* 👇 Your pages */}
      <Outlet />

      <div id="popup-models" className="relative"></div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
        toastClassName="bg-gray-800 border border-gray-700 dark:bg-gray-900"
        progressClassName="bg-gradient-to-r from-purple-500 to-pink-500"
      />
    </div>
  );
}

export default App;
