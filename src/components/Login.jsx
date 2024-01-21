import React, { useState, useEffect } from "react";
import axios from "axios";

import TodoPage from "./Page/TodoPage";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [host, setHost] = useState("");
  const [Todovisible, setTodovisible] = useState(false);


  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에서 사용자를 인증하는 로직을 추가할 수 있습니다.
    // 인증이 성공하면 로그인 상태를 설정하거나 필요한 동작을 수행합니다.
    alert("로그인 성공!");
    setHost();
    setTodovisible(!Todovisible);
    
  };

  return (
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
        {Todovisible ? "숨기기" : "로그인"}
        </button>
      </form>
      <h3>{host}</h3>
      {Todovisible &&  <TodoPage />}
    </>
  );
}

export default Login;
