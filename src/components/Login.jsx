import React, { useState, useEffect } from "react";
import axios from "axios";

import TodoPage from "./Page/TodoPage";

function Login() {
  // 회원이름 
  const [username, setUsername] = useState("");
  // 회원의 비밀번호
  const [password, setPassword] = useState("");
  // True라면 로그아웃 화면을 보여주고 false일땐 로그인 화면을 보여줌
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 로그인을 시도하면 form 기본전송을 e.preventDefault()을 통해 막고 axios를 통해 내가 배포해둔 API주소로 로그인 요청
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 서버에 로그인 요청
      const response = await axios.post(
        'https://todoapp-spring-brook-5982-little-grass-565-silent-shape-3149.fly.dev/login',
        { username, password }
      );

      // 로그인 성공 여부를 확인하고 상태 업데이트
      if (response.data.resultCode === "S-1") {
        setIsAuthenticated(true);
      } else {
        // 로그인 실패 시에 대한 처리
        console.error("로그인 실패:", response.data.msg);
      }
    } catch (error) {
      console.error('로그인 요청 에러:', error);
      alert("존재하지 않는 이름 혹은 비밀번호입니다.")
    }
  };
 // 로그아웃 시 필요한 동작
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername(""); // 로그아웃 시에 username을 초기화
    setPassword(""); // 로그아웃 시에 password를 초기화
  };

// 로그인 입력창에 입력한값이 올바르지않아 지우고싶을때 버튼눌러서 입력 초기화
  const inputreset = () => {
    setUsername(""); // username을 초기화
    setPassword(""); // password를 초기화
  }
  
  return (
    <>
      {isAuthenticated ? (
        <>
          <h2>로그아웃</h2>
          <button onClick={handleLogout}>로그아웃</button>
        </>
      ) : (
        <>
          <h2>로그인</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-el">
              <label htmlFor="username">이름</label> <br />
              <input
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {username && <button onClick={inputreset}>X</button>}
            </div>

            <div className="form-el">
              <label htmlFor="password">비밀번호</label> <br />
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {password && <button onClick={inputreset}>X</button>}
            </div>
            <button type="submit">
              로그인
            </button>
          </form>
        </>
      )}
      {isAuthenticated && <TodoPage username={username} />}
    </>
  );
}

export default Login;