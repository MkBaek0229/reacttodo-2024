// FirstPage.js

import React, { useState } from "react";
import Signup from "../Signup";
import Login from "../Login";
import TodoPage from "./TodoPage";

function FirstPage() {
  // visible이 True일때는 로그인창을 false일떄는 회원가입창을 보여줌
  const [visible, setVisible] = useState(false);
  // 로그인을 하게되면 로그인 창을 보여주도록 함
  const [loggedIn, setLoggedIn] = useState(false);
  // 로그인 시도시 입력창에 입력된 이름을 검증하고자 저장함
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
            {visible ? "로그인창" : "회원가입창"}
          </button>
          <hr />
          {visible ? <Signup /> : <Login onLogin={handleLogin} />}
          <h1>회원가입 구현완료</h1>
          <p>현재 문제점 todo하나남앗을떄 삭제하면 곧바로 렌더링이안되는 문제 존재함<br />
            + 비밀번호 숫자+영문자+특수문자 조합으로 8자리 이상아니여도 가입됨<br />
            + 전화번호 작성시 - 000-0000-0000 틀에 맞혀져있어서 010작성하면 바로 -가생김 근데 안지워지는게문제<br />

          </p>
        </div>
        
      )}
    </div>
  );
}

export default FirstPage;
