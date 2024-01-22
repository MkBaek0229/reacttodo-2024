import React, { useState, useEffect } from "react";
import axios from "axios";

import TodoPage from "./Page/TodoPage";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [Todovisible, setTodovisible] = useState(false);
  const [host, setHost] = useState(""); // 추가

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
        setHost(response.data.data.host);
        setTodovisible(!Todovisible);
      } else {
        // 로그인 실패 시에 대한 처리
        console.error("로그인 실패:", response.data.msg);
      }
    } catch (error) {
      console.error('로그인 요청 에러:', error);
      alert("존재하지 않는 이름 혹은 비밀번호입니다.")
    }
  };

  const handleLogout = () => {
    // 로그아웃 시 필요한 동작을 수행합니다.
    setIsAuthenticated(false);
    setTodovisible(false);
    setUsername(""); // 로그아웃 시에 username을 초기화
    setPassword(""); // 로그아웃 시에 password를 초기화
  };

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
              {username && <button>X</button>}
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
              {password && <button>X</button>}
            </div>
            <button type="submit">
              {Todovisible ? "로그아웃" : "로그인"}
            </button>
          </form>
        </>
      )}
      <h3>{host}</h3>
      {isAuthenticated && <TodoPage username={username} />}
    </>
  );
}

export default Login;
