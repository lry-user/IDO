"use client";

import { useEffect } from "react";

export default function GlobalError({ error }: { error: Error }) {
  // Determine if this is an authentication error
  const isAuthError =
    error.name === "AuthError" ||
    error.name === "CredentialsSignin" ||
    error.message === "UNAUTHORIZED" ||
    error.message === "401" ||
    error.message === "token expired" ||
    error.name === "TokenExpiredError";

  useEffect(() => {
    // Report the error to server
    fetch("/api/error-logging", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: error.name,
        message: error.message,
        stack: error.stack,
        isAuthError,
        url: window.location.href,
        timestamp: new Date().toISOString(),
      }),
    }).catch(console.error); // Handle fetch errors silently

    // If it's an auth error, redirect to login after a short delay
    if (isAuthError) {
      const timer = setTimeout(() => {
        window.location.href = "/login";
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error, isAuthError]);

  function handleReset() {
    window.location.reload();
  }

  function handleBackToLogin() {
    window.location.href = "/login";
  }

  return (
    <html>
      <body className="bg-black text-white">
        <div className="fixed inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#F60004] to-transparent opacity-30 pointer-events-none"></div>
        <div className="flex items-center justify-center h-screen relative z-10">
          <div className="backdrop-blur-lg bg-[#ffffff10] border border-[#ffffff30] rounded-2xl p-8 text-center max-w-md">
            {isAuthError ? (
              <>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Session Expired
                </h2>
                <p className="text-gray-200 mb-6">
                  Your session has expired. Please login again.
                </p>
                <button
                  className="bg-[#02E2E2] text-black px-6 py-3 rounded-xl hover:bg-[#02E2E2]/80 transition-colors font-medium"
                  onClick={handleBackToLogin}
                >
                  Back to Login
                </button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Something went wrong!
                </h2>
                <p className="text-red-300 mb-6">
                  {process.env.NODE_ENV === "development"
                    ? error.message
                    : "An unexpected error occurred. Please try again later."}
                </p>
                <button
                  className="bg-[#02E2E2] text-black px-6 py-3 rounded-xl hover:bg-[#02E2E2]/80 transition-colors font-medium"
                  onClick={handleReset}
                >
                  Refresh
                </button>
              </>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
