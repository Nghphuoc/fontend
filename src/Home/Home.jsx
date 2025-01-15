import React, { useEffect, useState } from "react";
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
  const [meaning, setMeaning] = useState("Any word is not searched yet.")
  const [explanation, setExplanation] = useState("")
  const [example, setExample] = useState("")
  const [imgsrc1, setImgsrc1] = useState("")
  const [imgsrc2, setImgsrc2] = useState("")
  const [imgsrc3, setImgsrc3] = useState("")
  const [paragraphs, setParagraphs] = useState([])

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

  useEffect(() => {
    console.log("meaning:", meaning);
    console.log("indexText:", indexText);
    console.log("explanation:", explanation);
    console.log("example:", example);
    console.log("selectedText", selectedText);
  }, [meaning, indexText, explanation, example, selectedText]);
  

  //
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const openSidebar = () => {
    if (!isSidebarOpen) {
      toggleSidebar()
    }
  }

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
  
    if (!selectedString) return;
  
    // 노드 색칠
    const range = selection.getRangeAt(0);
    const span = document.createElement("span");
    span.style.backgroundColor = "yellow";
    span.textContent = selectedString;
    range.deleteContents();
    range.insertNode(span);
  
    // 1) UI를 위해 state 업데이트 (비동기)
    setSelectedText(selectedString);
    setIndexText(tempText[index]);
  
    // 2) API 호출에는 'state' 대신 바로 추출한 변수를 사용
    const API = "http://43.201.113.85:8000/gpt/search";
    const post_data = {
      user_id: 19,
      searching_word: selectedString,    // 여기!
      context_sentence: tempText[index], // 여기!
      target_language: "korean",
    };
  
    openSidebar();
  
    // 3) axios 호출
    axios.post(API, post_data)
      .then(response => {
        // 서버 응답 예: gpt_result가 "뜻/설명/예문" 형태라고 가정
        const [text1, text2, text3] = response.data.segmented_sentence.split(/\//);

  
        // 상태 갱신 (비동기)
        setMeaning(text1);
        setExplanation(text2);
        setExample(text3);
        setImgsrc1(response.data.image_results[0])
        setImgsrc2(response.data.image_results[1])
        setImgsrc3(response.data.image_results[2])
        // 콘솔에서 즉시 확인하고 싶다면 "로컬 변수"로 확인
        console.log("text1(뜻):", text1);
        console.log("text2(설명):", text2);
        console.log("text3(예문):", text3);
      })
      .catch(err => console.error(err));
  };




  const Review = (index) => {
    
    // 2) API 호출에는 'state' 대신 바로 추출한 변수를 사용
    const API = "http://43.201.113.85:8000/gpt/sentence-segment";
    const post_data = {
      complex_sentence: tempText[index],
      target_language: "korean",
    };
    console.log(post_data)
    openSidebar();
  
    // 3) axios 호출
    axios.post(API, post_data)
      .then(response => {
        const splitted = response.data.segmented_sentence?.split(/\//) || [];

        // 인덱스 0, 1, 2가 없을 수 있으니 각각 체크 후 상태 세팅
        setMeaning(splitted[0] || "");
        setExplanation(splitted[1] || "");
        setExample(splitted[2] || "");
      })
      .catch(err => console.error(err));
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
              <p className="mb-4">{meaning}</p>
              <p className="mb-4">{explanation}</p>
              <p className="mb-4">{example}</p>
              <img src={imgsrc1} alt="None" className="w-64 h-auto rounded"></img>
              <img src={imgsrc2} alt="None" className="w-64 h-auto rounded"></img>
              <img src={imgsrc3} alt="None" className="w-64 h-auto rounded"></img>
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
              {tempText.length !== 0 && (tempText.map((sentence, index) => (
                <ul key={index}>
                  <div className="flex items-start">
                    {/* 가위 이미지 버튼 */}
                    <button
                      className="
                        w-12 h-12         /* 버튼 자체 크기 고정 */
                        flex items-center  /* 수직/수평 가운데 정렬 */
                        justify-center
                        bg-transparent     /* 배경 투명 (테두리 X) */
                        mr-2              /* 오른쪽 간격 */
                        p-0               /* 기본 패딩 제거 */
                      "
                      onClick={() => {
                        Review(index)
                      }}
                      aria-label="가위 버튼"
                      style={{ border: "none", outline: "none" }}  // 혹시 남는 브라우저 기본 테두리 제거용
                    >
                      <img
                        src="src\Home\scissors.png"  // 실제 이미지 경로로 바꿔주세요
                        alt="가위"
                        className="w-6 h-6"
                      />
                    </button>

                    {/* 문장(li) */}
                    <li
                      className="
                        mb-2
                        px-4 py-2
                        bg-blue-100 text-black
                        rounded shadow
                        list-none
                      "
                      onMouseUp={() => handleMouseUp(index)}
                    >
                      {sentence}
                    </li>
                  </div>
                </ul>
              )))}
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
