import { useState } from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './Home/Home'
import LoginPage from "./Login/LoginPage";
import ChatBox from './homeChat/ChatBox';
import './index.css';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/Home" element={<Home/>}></Route>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/chatbox" element={<ChatBox />}></Route>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
