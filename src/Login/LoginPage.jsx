import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LoginApi } from "./api";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  // variable support you save user_id when you login 
  const [saveUserId, setSaveUserId] = useState("");

  const fadeInFromTop = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };


  // Hàm gọi API
  const loginButton = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // check input if null say Please enter Email
    if (!emailRegex.test(email)) {
      toast.error("Please enter Email");
      return;
    }
// if is Email say login successfully 
    try {
      LoginApi(email)
        .then((data) => {
          console.log("User ID:", data.user_id);
          setSaveUserId(data.user_id);
          localStorage.setItem("user_id",saveUserId);
          toast.success("Login successfully!");
          navigate("/home");
        })
        .catch((error) => {
          toast.error("Please enter Email");
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Hàm xử lý phím Enter
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      loginButton();
    }
  };

  return (
    <>
    <div className="text-center">
      <Toaster/>
    </div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <motion.h1
          className="text-center text-4xl mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeInFromTop}
        >
          Welcome to our Immersity!
        </motion.h1>

        <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-auto">
          <input
            type="email"
            placeholder="Enter your e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          />
          <button
            className="w-full p-3 rounded-full bg-gray-300 text-black font-bold hover:bg-gray-400"
            value={email}
            onClick={loginButton}
            onKeyDown={handleKeyDown}
          >
            Leave your first step!
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;