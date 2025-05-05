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
import { today } from "@app/libs/utilities/helper/date.helper";

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
  const {
    onAdd,
    onDelete,
    getList,
    onUpdate,
    create,
    list,
    delete: deleteState,
    update: updateState,
    loadingId,
  } = useTodos();

  const { pending: pendingCreate } = create;
  const { pending: pendingFetch, data: todos, success: successFetch } = list;
  const { pending: pendingDelete } = deleteState;
  const { pending: pendingUpdate } = updateState;

  const isLoading = pendingCreate || pendingFetch;

  const onSubmit = handleSubmit((data) => {
    const payload = { ...data, updatedAt: today };
    if (isEditing) {
      onUpdate({ ...payload, id: data.id as string });
      setIsEditing(() => false);
    } else {
      onAdd(payload);
    }
    reset();
  });

  const handleDelete = (id: string) => {
    setValue("id", id);
    onDelete(id);
  };

  const handleEdit = (data: ITodo) => {
    setValue("task", data.task ?? "");
    setValue("isCompleted", Boolean(data.isCompleted));
    setValue("id", data.id);
    setIsEditing(true);
  };

  const handleToggle = (data: ITodo) => {
    onUpdate(data);
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
          {!isLoading &&
            successFetch &&
            todos?.map((todo) => {
              return (
                <TodoCard
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                  handleToggle={handleToggle}
                  isEditing={watch("id") === todo.id}
                  isLoading={
                    loadingId === todo.id && (pendingUpdate || pendingDelete)
                  }
                  key={todo.id}
                  todo={todo}
                />
              );
            })}
          {/* List of todos loading state */}
          {isLoading && (
            <PageLoader
              title={
                pendingFetch
                  ? "Fetching Your Todos Data"
                  : "Updating Your Todo List"
              }
            />
          )}
          {/* Empty State */}
          {!isLoading && successFetch && todos?.length <= 0 && (
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
