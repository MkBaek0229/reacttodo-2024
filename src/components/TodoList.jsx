import React from "react";
import TodoListItem from "./TodoListItem";

function TodoList({ todos = [] , setTodos }) {
    return (
        <div>
            {todos.length > 0 ? (
                todos.map(todo => (
                    <TodoListItem key={todo.id} todo={todo} setTodos={setTodos} />
                ))
            ) : (
                <p>등록된 todos가 없어요.</p>
            )}
        </div>
    );
}


export default TodoList;
