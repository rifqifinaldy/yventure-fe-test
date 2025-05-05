"use client";

import InputField from "@app/libs/components/input";
import PageTitle from "@app/libs/components/page-header";
import useTodos from "@app/libs/utilities/hooks/useTodos";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import styles from "./style.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateTodo } from "./todos-form.validation";
import Button from "@app/libs/components/button";
import TodoCard from "@app/libs/components/card/todo-card";
import { ITodo } from "@app/libs/types/todo.types";
import EmptyState from "@app/libs/components/empty-state";
import PageLoader from "@app/libs/components/section-loader";

const TodosPage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const methods = useForm({
    resolver: yupResolver(validateTodo),
    values: {
      id: null,
      task: "",
      isCompleted: false,
    },
  });
  const {
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = methods;
  const { onAdd, onDelete, getList, create, list } = useTodos();

  const { pending: pendingCreate } = create;
  const { pending: pendingFetch, data: todos, success: successFetch } = list;

  const onSubmit = handleSubmit((data) => {
    onAdd({ ...data, updatedAt: new Date().toDateString() });
    reset();
  });

  const handleDelete = (id: string) => {
    onDelete(id);
  };

  const handleEdit = (data: ITodo) => {
    setValue("task", data.task ?? "");
    setValue("isCompleted", Boolean(data.isCompleted));
    setValue("id", data.id);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset();
  };

  useEffect(() => {
    getList();
  }, [getList]);

  return (
    <div>
      <PageTitle title="Todo List" subtitle="Create New Task" />
      <section className={styles.section}>
        <FormProvider {...methods}>
          <form onSubmit={onSubmit} noValidate>
            <InputField
              id="task"
              name="task"
              label={`${isEditing ? "Edit" : "Create"}  Task / Todo Item`}
              inputProps={{
                type: "text",
                required: true,
                placeholder: "Input your task description here",
              }}
              errorMessage={errors.task?.message}
            />
            <div className={styles.action_section}>
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={pendingCreate}
              >
                {pendingCreate ? "Loading" : "Update List"}
              </Button>
              {isEditing && (
                <Button
                  type="button"
                  colorScheme="yellow"
                  isLoading={pendingCreate}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
        {/* Todos Section Wrapper */}
        <div className={styles.todos_section}>
          {/* List of Todos */}
          {successFetch &&
            todos?.map((todo) => {
              return (
                <TodoCard
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                  isEditing={watch("id") === todo.id}
                  key={todo.id}
                  todo={todo}
                />
              );
            })}
          {/* List of todos loading state */}
          {pendingFetch && <PageLoader />}
          {/* Empty State */}
          {successFetch && todos?.length <= 0 && (
            <EmptyState
              title="There's nothing here yet"
              subtitle="Please add some items to get started."
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default TodosPage;
