"use client";

import {
  REQUEST_TODO_ADD,
  TODOS_SELECTOR_COLLECTION,
} from "@app/libs/redux/todos";
import { useAppDispatch, useAppSelector } from "@app/libs/redux/useRedux";
import { ITodo } from "@app/libs/types/todo.types";

const useTodos = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(TODOS_SELECTOR_COLLECTION);

  const onAdd = (e: React.FormEvent<HTMLFormElement>, todo: ITodo) => {
    e.preventDefault();
    dispatch(
      REQUEST_TODO_ADD({
        task: todo.task,
        id: Math.random().toString(),
        isCompleted: false,
      })
    );
  };

  return {
    ...state,
    onAdd,
  };
};

export default useTodos;
