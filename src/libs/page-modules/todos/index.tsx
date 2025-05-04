"use client";

import PageTitle from "@app/libs/components/page-header";
import useTodos from "@app/libs/utilities/hooks/useTodos";
import React, { useEffect } from "react";
import {} from "react-toastify";

const TodosPage: React.FC = () => {
  const { onAdd, getList, create, list } = useTodos();

  const { pending: pendingCreate } = create;
  const { pending: pendingFetch, data: todos, success: successFetch } = list;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd({
      task: "sseese",
    });
  };

  useEffect(() => {
    getList();
  }, [getList]);

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <PageTitle title="Todo List" subtitle="Create New Task" />
        <input id="task" type="text" />
        <div>
          <button type="submit">
            {pendingCreate ? "Loading" : "Add to List"}
          </button>
        </div>
      </form>
      {/* List of Todos */}
      {successFetch &&
        todos?.map((todo) => {
          return <h1 key={todo.id}>{todo.task}</h1>;
        })}
      {/* List of todos loading state */}
      {pendingFetch && <h1>Loading Todo List</h1>}
      {/* Empty State */}
      {successFetch && todos?.length <= 0 && <h1>Empty State</h1>}
    </div>
  );
};

export default TodosPage;
