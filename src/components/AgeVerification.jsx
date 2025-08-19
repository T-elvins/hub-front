import { useEffect, useState } from "react";

export default function AgeVerification() {
  const [isVerified, setIsVerified] = useState(null);

  useEffect(() => {
    const verified = localStorage.getItem("ageVerified");
    if (verified === "true") {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  }, []);

  const handleConfirm = (is18) => {
    if (is18) {
      localStorage.setItem("ageVerified", "true");
      setIsVerified(true);
    } else {
      alert("Sorry, you must be at least 18 years old to enter.");
      window.location.href = "https://google.com";
    }
  };

  if (isVerified === null || isVerified === true) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Blurred Background */}
      <div className="absolute inset-0 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80')]"></div>
      <div className="absolute inset-0 backdrop-blur-2xl bg-black/70"></div>
      
      {/* Modal Content */}
      <div className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-2xl shadow-2xl overflow-hidden w-full max-w-2xl">
        {/* Header with Warning Icon */}
        <div className="bg-red-900/40 py-4 px-6 border-b border-red-700/30">
          <div className="flex items-center justify-center gap-3">
            <div className="text-red-400 text-2xl">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h2 className="text-xl font-bold text-white text-center">Age Verification Required</h2>
          </div>
        </div>
        
        {/* Warning Message */}
        <div className="p-6 bg-black/40">
          <div className="mb-6 text-gray-300 text-center text-sm leading-relaxed">
            <p className="mb-4">
              <strong className="text-red-400">WARNING:</strong> This website contains age-restricted materials including 
              nudity and explicit depictions of sexual activity. By entering, you affirm that you are at least 
              18 years of age or the age of majority in the jurisdiction you are accessing the website from 
              and you consent to viewing sexually explicit content.
            </p>
            <p>
              Our Terms are changing. These changes will or have come into effect on 30 June 2025. 
              To see the updated changes, please see our New Terms of Service.
            </p>
          </div>
          
          <div className="bg-gray-800/50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-white text-center mb-2">
              Are you 18 years or older?
            </h3>
            <p className="text-gray-400 text-center text-sm mb-4">
              You must verify your age to enter this site
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleConfirm(true)}
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/20 hover:shadow-green-500/40 flex items-center justify-center gap-2"
              >
                <i className="fas fa-check"></i>
                Yes, I am 18+
              </button>
              <button
                onClick={() => handleConfirm(false)}
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/20 hover:shadow-red-500/40 flex items-center justify-center gap-2"
              >
                <i className="fas fa-times"></i>
                No, Im Under 18
              </button>
            </div>
          </div>
          
          <p className="text-gray-500 text-xs text-center">
            Your privacy is important to us. We do not store your age verification information.
          </p>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-500/10 rounded-full"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full"></div>
      </div>
      
      {/* Styles for the icons */}
      <style>
        {`
          @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
        `}
      </style>
    </div>
  );
}