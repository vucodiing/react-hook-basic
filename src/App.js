import React, { useEffect, useState } from "react";
import "./App.scss";
import queryString from "query-string";
import Pagination from "./components/Pagination";
import PostList from "./components/PostList";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "I love Easy Frontend! 😍 " },
    { id: 2, title: "We love Easy Frontend! 🥰 " },
    { id: 3, title: "They love Easy Frontend! 🚀 " },
  ]);

  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });
  const [filter, setFilter] = useState({
    _limit: 10,
    _page: 1,
  });
  useEffect(() => {
    async function fetchPostList() {
      try {
        const paramString = queryString.stringify(filter);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        const { data, pagination } = responseJSON;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log("Failed to fetch post list: ", error.message);
      }
    }

    fetchPostList();
  }, [filter]);
  function handlePageChange(newPage) {
    console.log("New page: ", newPage);
    setFilter({
      ...filter,
      _page: newPage,
    });
  }
  function handleTodoClick(todo) {
    const index = todoList.findIndex((x) => x.id === todo.id);
    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  function handleTodoFormSubmit(formValue) {
    const newTodo = {
      id: todoList.length + 1,
      ...formValue,
    };
    const newTodoList = [...todoList];

    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }
  return (
    <div className="app">
      <h1> Welcome to react hook! </h1>
      <TodoList todos={todoList} onTodoClick={handleTodoClick} />
      <TodoForm onSubmit={handleTodoFormSubmit} />
      <PostList posts={postList} />
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
}

export default App;
