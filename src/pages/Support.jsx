import React from "react";
import { icons } from "../assets/icons";
import { GuestComponent } from "../components";

function Support() {
  return (
    <section className="w-full flex justify-center items-center min-h-[80vh] pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
      <div className="flex flex-col items-center p-6 max-w-md w-full">
        <div className="mb-8 w-32 h-32 rounded-full dark:bg-[#E4D3FF] bg-[#ffefef] flex items-center justify-center shadow-lg">
          <span className="text-5xl dark:text-[#AE7AFF] text-red-500">
            {icons.support}
          </span>
        </div>
        
        <h5 className="text-2xl font-semibold dark:text-white text-red-400 mb-6 text-center">
          Contact us for any issue or Support
        </h5>
        
        <div className="w-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border dark:border-gray-700 border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-lg dark:bg-[#AE7AFF]/20 bg-red-100">
              <span className="text-xl dark:text-[#AE7AFF] text-red-500">
                {icons.email}
              </span>
            </div>
            <div>
              <h3 className="font-medium dark:text-white">Email Support</h3>
              <a 
                href="mailto:support@hub-community.com" 
                className="text-sm dark:text-gray-300 text-gray-600 hover:underline"
              >
                support@hub-community.com
              </a>
            </div>
          </div>
        </div>
        
        <p className="mt-8 text-center dark:text-gray-400 text-gray-500 text-sm">
          We typically respond within 24 hours
        </p>
      </div>
    </section>
  );
}

export default Support;