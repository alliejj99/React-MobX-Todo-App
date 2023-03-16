import { observer } from "mobx-react";
import React, { useState } from "react";
import TodoStore from "./TodoStore";

interface TodoListProps {
  todoStore: TodoStore;
}

// React.FC : 리액트 함수 컴포넌트
const TodoList: React.FC<TodoListProps> = ({ todoStore }) => {
  const [value, setValue] = useState<string>("");

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button
        onClick={() => {
          if (value) {
            todoStore.addTodo(value);
          }
          setValue("");
        }}
      >
        Add Todo
      </button>
      <ul>Completed: {todoStore.status.completed}</ul>
      <ul>Remaining: {todoStore.status.remaining}</ul>

      <ul>
        {todoStore.todos.map((todo) => {
          return (
            <li
              key={todo.id}
              className="list"
              onClick={() => todoStore.toggelTodo(todo.id)}
            >
              {todo.title}
              <span className="checked">{todo.completed ? "O" : ""}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default observer(TodoList);
