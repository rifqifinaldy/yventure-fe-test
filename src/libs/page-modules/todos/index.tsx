"use client";

import InputField from "@app/libs/components/input";
import PageTitle from "@app/libs/components/page-header";
import useTodos from "@app/libs/utilities/hooks/useTodos";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import styles from "./style.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateTodo } from "./todos-form.validation";

const TodosPage: React.FC = () => {
  const methods = useForm({
    resolver: yupResolver(validateTodo),
    defaultValues: {
      task: "",
    },
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;
  const { onAdd, onDelete, getList, create, list } = useTodos();

  const { pending: pendingCreate } = create;
  const { pending: pendingFetch, data: todos, success: successFetch } = list;

  const onSubmit = handleSubmit((data) => {
    onAdd(data);
  });

  const handleDelete = (id: string) => {
    onDelete(id);
  };

  useEffect(() => {
    getList();
  }, [getList]);

  return (
    <div>
      <FormProvider {...methods}>
        <PageTitle title="Todo List" subtitle="Create New Task" />
        <form onSubmit={onSubmit} className={styles.form_section} noValidate>
          <InputField
            id="task"
            name="task"
            label="Create Task / Todo Item"
            inputProps={{
              type: "text",
              required: true,
              placeholder: "Input your task description here",
            }}
            errorMessage={errors.task?.message}
          />
          <div>
            <button type="submit">
              {pendingCreate ? "Loading" : "Add to List"}
            </button>
          </div>
        </form>
      </FormProvider>
      {/* List of Todos */}
      {successFetch &&
        todos?.map((todo) => {
          return (
            <div key={todo.id}>
              <h1>{todo.task}</h1>
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
              <button onClick={() => console.log(todo.id)}>Select</button>
            </div>
          );
        })}
      {/* List of todos loading state */}
      {pendingFetch && <h1>Loading Todo List</h1>}
      {/* Empty State */}
      {successFetch && todos?.length <= 0 && <h1>Empty State</h1>}
    </div>
  );
};

export default TodosPage;
