import { useState } from "react";

const ChatBox =()=>{
    
// const [messages, setMessages] = useState([]);
// const [input, setInput] = useState("");

// const handleSend = () => {
//   if (input.trim() !== "") {
//     setMessages([...messages, { text: input, sender: "self" }]);
//     setInput("");
//   }
// };
//     return (
//       <>
//         <tabel>
//           {messages.map((message, index) => (
//             <div
//               key={index}
//               class="p-4 rounded-lg shadow-md mb-4 bg-gray-200 self-center text-gray-700 text-center w-1/3"
//             >
//               <p>{message.text}</p>
//             </div>
//           ))}
//         </tabel>

//         <input
//           type="text"
//           placeholder="Type a message"
//           class="flex-1 p-2 rounded-lg border border-gray-300 mr-2 "
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyPress={(e) => e.key === "Enter" && handleSend()}
//         />
//         <button
//           class="bg-blue-500 text-white p-2 rounded-lg"
//           onClick={handleSend}
//         >
//           Send
//         </button>
//       </>
//     );

  const [selectedText, setSelectedText] = useState("");

  const handleMouseUp = () => {
    const selection = window.getSelection();
    const selectedString = selection.toString().trim();

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

      setSelectedText(selectedString);
    }
  };

  return (
    <div className="p-4">
      <p onMouseUp={handleMouseUp} className="text-gray-800 leading-relaxed">
        This is an example text. Select any word or phrase to see it highlighted
        in yellow.
      </p>

      {selectedText && (
        <div className="mt-4 p-2 bg-blue-100 text-blue-800 rounded">
          <strong>You selected:</strong> {selectedText}
        </div>
      )}
    </div>
  );

}

export default ChatBox;