"use client";

import {
  REQUEST_TODO_ADD,
  TODOS_SELECTOR_COLLECTION,
} from "@app/libs/redux/todos";
import { useAppDispatch, useAppSelector } from "@app/libs/redux/useRedux";
import { ITodo } from "@app/libs/types/todo.types";
import useResponse from "./useResponse";

const useTodos = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(TODOS_SELECTOR_COLLECTION);

  const { handleSuccess, handleError } = useResponse();

  const onAdd = (e: React.FormEvent<HTMLFormElement>, todo: ITodo) => {
    e.preventDefault();
    dispatch(REQUEST_TODO_ADD(todo)).then((res) => {
      console.log("FULLFILLED", res.payload);
      if (res.meta.requestStatus === "fulfilled") {
        handleSuccess(res.payload.message);
      } else if (res.meta.requestStatus === "rejected") {
        handleError(res.payload.status, res.payload.response.message);
      }
    });
  };

  return {
    ...state,
    onAdd,
  };
};

export default useTodos;
