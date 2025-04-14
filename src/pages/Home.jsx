// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center space-y-6 px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">🖥️ Ahmed Share Screen</h1>
      <p className="text-gray-400 mb-8 text-center">
        Choose your role to start sharing or viewing the screen.
      </p>
      <div className="flex flex-col md:flex-row gap-6">
        <button
          onClick={() => navigate("/sender")}
          className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 transition text-lg font-semibold"
        >
          Start Sharing
        </button>
        <button
          onClick={() => navigate("/viewer")}
          className="px-6 py-3 rounded-2xl bg-green-600 hover:bg-green-700 transition text-lg font-semibold"
        >
          Start Viewing
        </button>
      </div>
    </div>
  );
}

export default Home;
