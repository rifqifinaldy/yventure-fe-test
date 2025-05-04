"use client";

import useTodos from "@app/libs/utilities/hooks/useTodos";
import React from "react";
import {} from "react-toastify";

const TodosPage: React.FC = () => {
  const { onAdd, createState } = useTodos();

  const { pending } = createState;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd(e, {
      id: "ID",
      task: "ss",
      isCompleted: false,
    });
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h2>Create new Task</h2>
        <input id="task" type="text" />
        <div>
          <button type="submit">{pending ? "Loading" : "Add to List"}</button>
        </div>
      </form>
    </div>
  );
};

export default TodosPage;
