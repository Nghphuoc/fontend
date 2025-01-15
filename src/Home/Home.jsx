import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from 'axios';


function Home() {
  const [text, setText] = useState(""); // 텍스트 상태 저장
  const [tempText, setTempText] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userInput, setUserInput] = useState([]);
  const [messages, setMessages] = useState("");
  const [isInputAtBottom, setIsInputAtBottom] = useState(false);
  const [result, setResult] = useState("");

  const fadeInFromTop = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isSearchBarMoved, setIsSearchBarMoved] = useState(false); // 서치바 이동 상태
  const [title, setTitle] = useState("Past your text in the text-box");
  // variable save data user choose and line text user choose
  const [selectedText, setSelectedText] = useState(""); // this will save all text

  const [indexText, setIndexText] = useState(""); // this will save index text user choose

  //
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen);
  };

  const clicked = () => {
    // check input if just space or do not enter will not send 
    if (!userInput.trim()) {
      // Kiểm tra nếu input trống hoặc chỉ chứa khoảng trắng
      alert("Input cannot be empty!");
      return; // Ngăn không cho tiến trình tiếp tục
    }
    
      const formatted = userInput
        .split(/(?<=[.!?])\s+/) // ".", "!", "?" 뒤의 공백 기준으로 분리
        .map((sentence) => sentence.trim()) // 각 문장의 앞뒤 공백 제거
        .filter(Boolean);
      setTempText(formatted);
      setText("");
      if (title != "Summerize") {
        setTitle("Summerize");
      } else {
        setTitle("Past your text in the text-box");
      }
      handleRemoveAll();
      setMessages([...messages, { text: userInput, sender: "self" }]);
      setUserInput("");
      setIsInputAtBottom(true);
    
  };

  const [showButtons, setShowButtons] = useState(true);

  const handleRemoveAll = () => {
    // 버튼 보임 여부를 false 로 변경
    if (showButtons) {
      setShowButtons(false);
    } else {
      setShowButtons(true);
    }
  };

  // This function is used to identify the text that the user has highlighted, saved, and retrieve all the text that the user has saved.
  const handleMouseUp = (index) => {
    const selection = window.getSelection();
    const selectedString = selection.toString();

    if (selectedString) {
      // Lấy node cha chứa đoạn văn bản đã chọn
      const range = selection.getRangeAt(0);
      const span = document.createElement("span");

      // Thêm class để đổi màu
      span.style.backgroundColor = "yellow";
      span.textContent = selectedString;

      // Thay thế đoạn văn bản đã chọn bằng span
      range.deleteContents();
      range.insertNode(span);

      // Lưu chữ đã chọn và toàn bộ câu tương ứng
      setSelectedText(selectedString);
      setIndexText(tempText[index]);

      const API = "http://43.201.113.85:8000/gpt/search"
      const post_data = {"user_id" : "qwer@egg.com", "searching_word": selectedText, "context_sentence": indexText, "target_language":"english"}

      
      console.log(selectedText);
      console.log(indexText);  
      
      axios.post(API,post_data).then(response => {setResult(response)});

      console.log(result);
      toggleSidebar();
    }
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
            {/* Messages */}
            <div className="whitespace-pre-wrap">
              {tempText.map((sentence, index) => (
                <ul key={index}>
                  <li
                    className="mb-2 px-4 py-2 bg-blue-100 text-black rounded shadow"
                    onMouseUp={() => handleMouseUp(index)}
                  >
                    {sentence}
                  </li>
                </ul>
              ))}
            </div>

            <motion.h1
              className="text-center text-4xl mb-8"
              initial="hidden"
              animate="visible"
              variants={fadeInFromTop}
            >
              {title}
            </motion.h1>

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
                  className="flex-1 px-4 py-2 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-800"
                  placeholder="Enter Text..."
                />
                <button
                  onClick={clicked}
                  className="px-6 py-2 bg-blue-500 text-white font-medium rounded-full hover:bg-blue-600 transition duration-300"
                >
                  Send
                </button>
              </div>
              <div className="search w-full max-w-md">
                {/* <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="w-full px-4 py-2 border rounded-full focus:outline-none"
                  placeholder="Enter Text"
                />
                <button
                  className="w-full mt-2 px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600"
                  onClick={handleSend}
                >
                  Send
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
