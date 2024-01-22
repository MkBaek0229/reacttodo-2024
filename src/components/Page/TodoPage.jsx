// TodoPage.js

import React, { useState, useEffect } from "react";
import TodoWrite from "../TodoWrite";
import TodoList from "../TodoList";
import TodoTemplate from "../TodoTemplate";
import axios from "axios";

function TodoPage({ username }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    try {
      const response = await axios.get(`https://todoapp-spring-brook-5982-little-grass-565-silent-shape-3149.fly.dev/${username}/todos`);
      setTodos(response.data.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  return (
    <div>
      <TodoTemplate username={username}>
        <TodoWrite username={username} setTodos={setTodos} />
        <TodoList username={username} todos={todos} setTodos={setTodos} />
      </TodoTemplate>
    </div>
  );
}

export default TodoPage;
