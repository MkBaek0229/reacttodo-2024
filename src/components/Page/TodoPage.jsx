import React, { useState, useEffect } from "react";
import TodoWrite from "../TodoWrite";
import TodoList from "../TodoList";
import TodoTemplate from "../TodoTemplate";
import axios from "axios";

function TodoPage() {
// 데이터 로직
const [todos, settodos] = useState([])

useEffect(() => {
    getHost();
  }, []);

const getHost = async () => {
    try {
      const res = await axios.get('https://todoapp-spring-brook-5982-little-grass-565-silent-shape-3149.fly.dev/kim/todos');
      settodos(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.error('Error fetching host:', error);
    }
  };

  
    return (  
      <div>
        <TodoTemplate>
        <TodoWrite setTodos={settodos} />
        <TodoList todos={todos} setTodos={settodos}
      />
      </TodoTemplate>
      </div>
    );
}

export default TodoPage;