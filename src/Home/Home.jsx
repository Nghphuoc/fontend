import React, { useState } from "react";
import { motion } from "framer-motion";
function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userInput, setUserinput] = useState("");

  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: "self" }]);
      setInput("");
    }
  };

  const handleClickSearch = () => {

  }

  const fadeInFromTop = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (
    <div className="App">
      {/* Thanh điều hướng */}
      <div className="navbar flex justify-between p-4 bg-gray-100 shadow">
        <button
          onClick={toggleSidebar}
          className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          Sidebar
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600">
          Review
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600">
          Language
        </button>
      </div>

      {/* Bố cục chính */}
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full bg-gray-200 shadow-lg ${
            isSidebarOpen ? "w-64" : "w-0"
          } overflow-hidden transition-all duration-300 ease-in-out`}
        >
          <div className="p-4">
            <button
              onClick={toggleSidebar}
              className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
            >
              Close Sidebar
            </button>
            <p className="mb-4">Menu Item 1</p>
            <p className="mb-4">Menu Item 2</p>
            <p className="mb-4">Menu Item 3</p>
          </div>
        </div>

        {/* Nội dung chính */}
        <div
          className={`flex-1 flex flex-col items-center justify-center ${
            isSidebarOpen ? "ml-64" : "ml-0"
          } transition-all duration-300 ease-in-out`}
        >
          <motion.h1
            className="text-center text-4xl mb-8"
            initial="hidden"
            animate="visible"
            variants={fadeInFromTop}
          >
            <h3>AI Language Learning Services for the Upper Level</h3>
          </motion.h1>
          <div className="flex flex-col items-center space-y-4">
            <div className="search w-full max-w-md">
              <input
                className="w-full px-4 py-2 border rounded-full focus:outline-none bg-gray-50"
                placeholder="Enter Text"
              />
              <button className="w-full mt-2 px-4 py-2 bg-gray-300 text-white rounded-full hover:bg-gray-400">
                Search
              </button>
            </div>
            <div className="news grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                BBC
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                Le Monde
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                Le Figaro
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                New York Times
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                Tuổi Trẻ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
