import React from "react";

function TodoList(props) {
  const { todos, onTodoClick } = props;
  function handleClick(todo) {
    onTodoClick(todo);
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} onClick={() => handleClick(todo)}>
          {todo.title}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
