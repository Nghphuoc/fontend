import { useState } from "react";
import { motion } from "framer-motion";

const LoginPage = () => {
  
  const [email, setemail] = useState("");

  const fadeInFromTop = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const loginButton = () => {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">

      <motion.h1
        className="text-center text-4xl mb-8"
        initial="hidden"
        animate="visible"
        variants={fadeInFromTop}
      >
        Welcome to AI language learning!
      </motion.h1>

      <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-80">
        <input
          type="email"
          placeholder="Enter your e-mail"
          className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <button
          className="w-full p-3 rounded-full bg-gray-300 text-black font-bold hover:bg-gray-400"
          onClick={loginButton}
        >
          Leave your first step!
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
