"use client";

import {
  REQUEST_TODO_ADD,
  REQUEST_TODO_LIST,
  TODOS_SELECTOR_COLLECTION,
} from "@app/libs/redux/todos";
import { useAppDispatch, useAppSelector } from "@app/libs/redux/useRedux";
import { ITodoPayload } from "@app/libs/types/todo.types";
import useResponse from "./useResponse";
import { useCallback } from "react";

const useTodos = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(TODOS_SELECTOR_COLLECTION);

  const { handleSuccess, handleError } = useResponse();

  const onAdd = useCallback(
    (payload: ITodoPayload) => {
      dispatch(REQUEST_TODO_ADD(payload)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          handleSuccess(res.payload.message);
        } else if (res.meta.requestStatus === "rejected") {
          handleError(res.payload.status, res.payload.response.message);
        }
      });
    },
    [dispatch, handleError, handleSuccess]
  );

  const getList = useCallback(() => {
    dispatch(REQUEST_TODO_LIST()).then((res) => {
      if (res.meta.requestStatus === "rejected") {
        handleError(res.payload.status, res.payload.response.message);
      }
    });
  }, [dispatch, handleError]);

  return {
    ...state,
    onAdd,
    getList,
  };
};

export default useTodos;
