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
          <h1>현재 로그인 기능 까지만 구현 이용하고 싶을시 아이디: kim 비밀번호 : 1234</h1>
        </div>
        
      )}
    </div>
  );
}

export default FirstPage;
