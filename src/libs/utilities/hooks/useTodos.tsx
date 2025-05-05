"use client";

import {
  REQUEST_TODO_ADD,
  REQUEST_TODO_DELETE,
  REQUEST_TODO_LIST,
  REQUEST_TODO_UPDATE,
  TODOS_SELECTOR_COLLECTION,
} from "@app/libs/redux/todos";
import { useAppDispatch, useAppSelector } from "@app/libs/redux/useRedux";
import { ITodo, ITodoPayload } from "@app/libs/types/todo.types";
import useResponse from "./useResponse";
import { useCallback, useState } from "react";

const useTodos = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(TODOS_SELECTOR_COLLECTION);
  const [loadingId, setLoadingId] = useState<string>();

  const { handleSuccess, handleError } = useResponse();

  const getList = useCallback(() => {
    dispatch(REQUEST_TODO_LIST()).then((res) => {
      if (res.meta.requestStatus === "rejected") {
        handleError(res.payload.status, res.payload.response.message);
      }
    });
  }, [dispatch, handleError]);

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

  const onDelete = useCallback(
    (id: string) => {
      setLoadingId(id);
      dispatch(REQUEST_TODO_DELETE(id)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          handleSuccess(res.payload.message);
        } else if (res.meta.requestStatus === "rejected") {
          handleError(res.payload.status, res.payload.response.message);
        }
      });
    },
    [dispatch, handleError, handleSuccess]
  );

  const onUpdate = useCallback(
    (payload: ITodo) => {
      setLoadingId(payload.id);
      dispatch(REQUEST_TODO_UPDATE(payload)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          handleSuccess(res.payload.message);
        } else if (res.meta.requestStatus === "rejected") {
          handleError(res.payload.status, res.payload.response.message);
        }
      });
    },
    [dispatch, handleError, handleSuccess]
  );

  return {
    ...state,
    loadingId,
    onAdd,
    onDelete,
    onUpdate,
    getList,
  };
};

export default useTodos;
