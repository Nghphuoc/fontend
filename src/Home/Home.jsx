import React, { useState } from "react";
import { motion } from "framer-motion";

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userInput, setUserInput] = useState([]);
  const [messages, setMessages] = useState("");
  const [isInputAtBottom, setIsInputAtBottom] = useState(false);
  const [text, setText] = useState("")

  const handleSend = () => {
    if (userInput.trim() !== "") {
      setText(userInput)
      const formatted = text
        .split(/(?<=[.!?])\s+/)
        .map(sentence=>sentence.trim())
        .filter(Boolean);
      setText(formatted);
      setUserInput("");
      setIsInputAtBottom(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const fadeInFromTop = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="App">
        {/* Navbar */}
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

        {/* Main Layout */}
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

          {/* Main Content */}
          <div
            className={`flex-1 flex flex-col items-center justify-center ${
              isSidebarOpen ? "ml-64" : "ml-0"
            } transition-all duration-300 ease-in-out`}
          >
            {messages.length === 0 && (
              <motion.h1
                className="text-center text-4xl mb-8"
                initial="hidden"
                animate="visible"
                variants={fadeInFromTop}
              >
                AI Language Learning Services for the Upper Level
              </motion.h1>
            )}

            {/* Messages */}
            <div className="flex flex-col items-center space-y-4 mb-16">
              {text.map((message, index) => (
                <ul key = {index}>
                  <li className = "mb-2 px-4 py-2 bg-blue-100 text-black rounded shadow">{message}</li>
                </ul>
                ))}
            </div>

            {/* Input and Send Button */}
            <div
              className={`${
                isInputAtBottom ? "absolute bottom-0 left-0 w-full" : "relative"
              } p-4`}
            >
              <div className="flex items-center gap-4 bg-white p-4 rounded-full shadow-md max-w-2xl mx-auto mt-4">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 px-4 py-2 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-800"
                  placeholder="Enter Text..."
                />
                <button
                  onClick={handleSend}
                  className="px-6 py-2 bg-blue-500 text-white font-medium rounded-full hover:bg-blue-600 transition duration-300"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
