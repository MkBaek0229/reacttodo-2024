// TodoPage.js

import React, { useState, useEffect } from "react";
import TodoWrite from "../TodoWrite";
import TodoList from "../TodoList";
import TodoTemplate from "../TodoTemplate";
import axios from "axios";

// TodoPage 컴포넌트 정의
function TodoPage({ username }) {
  // 할 일 목록을 관리하는 상태 변수
  const [todos, setTodos] = useState([]);

  // 컴포넌트가 처음 마운트될 때 실행되는 useEffect 훅
  useEffect(() => {
    // 할 일 목록을 가져오는 함수 호출
    getTodos();
  }, []);

  // 서버에서 할 일 목록을 가져오는 비동기 함수
  const getTodos = async () => {
    try {
      // 서버에서 할 일 목록을 가져온 후 상태 업데이트
      const response = await axios.get(`https://todoapp-spring-brook-5982-little-grass-565-silent-shape-3149.fly.dev/${username}/todos`);
      setTodos(response.data.data);
    } catch (error) {
      // 에러가 발생한 경우 콘솔에 에러 메시지 출력
      console.error("할 일 목록을 불러오는 중 에러 발생:", error);
    }
  };

  // TodoPage 컴포넌트의 렌더링 결과
  return (
    <div>
      {/* TodoTemplate을 이용하여 레이아웃 구성 */}
      <TodoTemplate username={username}>
        {/* 할 일을 작성하는 컴포넌트 */}
        <TodoWrite username={username} setTodos={setTodos} />
        {/* 할 일 목록을 표시하는 컴포넌트 */}
        <TodoList username={username} todos={todos} setTodos={setTodos} />
      </TodoTemplate>
    </div>
  );
}

export default TodoPage;
