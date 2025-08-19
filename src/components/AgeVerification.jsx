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
      {/* Blurred Background with overlay */}
      <div className="absolute inset-0 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80')]"></div>
      <div className="absolute inset-0 backdrop-blur-xl bg-black/70"></div>
      
      {/* Warning message section */}
      <div className="bg-amber-900/80 text-amber-100 p-4 mb-6 rounded-lg max-w-2xl mx-auto text-center absolute top-10 left-1/2 transform -translate-x-1/2 w-11/12 z-10 border border-amber-700/50">
        <div className="flex items-center justify-center gap-2 mb-2">
          <i className="fas fa-exclamation-triangle text-amber-300"></i>
          <strong className="text-amber-50">AGE RESTRICTED CONTENT</strong>
        </div>
        <p className="text-sm">
          This website contains age-restricted materials including nudity and explicit depictions of sexual activity. 
          By entering, you affirm that you are at least 18 years of age or the age of majority in the jurisdiction 
          you are accessing the website from and you consent to viewing sexually explicit content.
        </p>
        <p className="text-xs mt-2 text-amber-200">
          Our Terms are changing. These changes will or have come into effect on 30 June 2025. 
          To see the updated changes, please see our New Terms of Service.
        </p>
      </div>

      {/* Modal Content */}
      <div className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-2xl shadow-2xl overflow-hidden w-full max-w-md p-8">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-900 to-red-900 flex items-center justify-center border-4 border-purple-500/30">
            <i className="fas fa-question text-4xl text-purple-300"></i>
          </div>
        </div>
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-white mb-2">
          Age Verification
        </h2>
        
        {/* Description */}
        <p className="text-gray-300 text-center mb-8">
          Please confirm you are at least 18 years old to enter this site
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => handleConfirm(true)}
            className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/20 hover:shadow-green-500/40 flex items-center justify-center gap-2"
          >
            <i className="fas fa-check"></i>
            Yes
          </button>
          <button
            onClick={() => handleConfirm(false)}
            className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/20 hover:shadow-red-500/40 flex items-center justify-center gap-2"
          >
            <i className="fas fa-times"></i>
            No
          </button>
        </div>
        
        {/* Footer note */}
        <p className="text-gray-500 text-xs text-center mt-6">
          Your privacy is important to us. We do not store your age verification information.
        </p>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-purple-500/10 rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-red-500/10 rounded-full"></div>
      </div>
      
      {/* Font Awesome CSS */}
      <style>
        {`
          @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
        `}
      </style>
    </div>
  );
}