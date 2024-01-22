// FirstPage.js

import React, { useState } from "react";
import Signup from "../Signup";
import Login from "../Login";
import TodoPage from "./TodoPage";

function FirstPage() {
  const [visible, setVisible] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLogin = (username) => {
    setLoggedIn(true);
    setUsername(username);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
  };

  return (
    <div>
      {loggedIn ? (
        <div>
          <h2>{`${username}님의 Todo 페이지`}</h2>
          <button onClick={handleLogout}>로그아웃</button>
          <hr />
          <TodoPage username={username} />
        </div>
      ) : (
        <div>
          <h2>메인 페이지</h2>
          <button onClick={toggleVisibility}>
            {visible ? "숨기기" : "회원가입"}
          </button>
          <hr />
          {visible ? <Signup /> : <Login onLogin={handleLogin} />}
        </div>
      )}
    </div>
  );
}

export default FirstPage;
