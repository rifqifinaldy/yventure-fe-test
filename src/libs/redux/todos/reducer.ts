import { createReducer } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { IReduxState, reduxState } from "../useRedux";
import { ITodo } from "@app/libs/types/todo.types";
import {
  REQUEST_TODO_ADD,
  REQUEST_TODO_DELETE,
  REQUEST_TODO_LIST,
  REQUEST_TODO_UPDATE,
} from "./action";
import { ELocalStorageKey } from "@app/libs/types/key.types";
import { saveToLocalStorage } from "@app/libs/utilities/helper/save-to-local.helper";

type ITodoState = {
  create: IReduxState<ITodo | null>;
  list: IReduxState<ITodo[] | []>;
  delete: IReduxState<null | { data: string }>;
  update: IReduxState<ITodo | null>;
  refetch: boolean;
};

const initialState: ITodoState = {
  create: { ...reduxState, data: null },
  list: { ...reduxState, data: [] },
  delete: { ...reduxState, data: null },
  update: { ...reduxState, data: null },
  refetch: false,
};

export const TODO_REDUCER = createReducer(initialState, (builder) => {
  builder
    // ADD TODO
    .addCase(REQUEST_TODO_ADD.pending, (state) => {
      state.create.pending = true;
      state.create.success = false;
      state.create.error = null;
    })
    .addCase(REQUEST_TODO_ADD.fulfilled, (state, { payload }) => {
      const data: ITodo = payload.data;
      state.create.pending = false;
      state.create.success = true;
      state.create.data = payload.data;
      (state.list.data as ITodo[]).push(data);
      saveToLocalStorage(ELocalStorageKey.TODOS, state.list.data);
    })
    .addCase(REQUEST_TODO_ADD.rejected, (state, { payload }) => {
      state.create.pending = false;
      state.create.error = payload as AxiosError;
    })
    // List of Todo Item
    .addCase(REQUEST_TODO_LIST.pending, (state) => {
      state.list.pending = true;
      state.list.success = false;
      state.list.error = null;
    })
    .addCase(REQUEST_TODO_LIST.fulfilled, (state, { payload }) => {
      state.list.pending = false;
      state.list.success = true;
      state.list.data = payload.data;
      saveToLocalStorage(ELocalStorageKey.TODOS, state.list.data);
    })
    .addCase(REQUEST_TODO_LIST.rejected, (state, { payload }) => {
      state.list.pending = false;
      state.list.error = payload as AxiosError;
    })
    // DELETE TODO
    .addCase(REQUEST_TODO_DELETE.pending, (state) => {
      state.delete.pending = true;
      state.delete.success = false;
      state.delete.error = null;
    })
    .addCase(REQUEST_TODO_DELETE.fulfilled, (state, { payload }) => {
      state.delete.pending = false;
      state.delete.success = true;
      state.delete.data = payload.data;
      state.list.data = state.list.data.filter(
        (todo) => todo.id !== payload.data.id
      );
      saveToLocalStorage(ELocalStorageKey.TODOS, state.list.data);
    })
    .addCase(REQUEST_TODO_DELETE.rejected, (state, { payload }) => {
      state.delete.pending = false;
      state.delete.error = payload as AxiosError;
    })
    // UPDATE TODO
    .addCase(REQUEST_TODO_UPDATE.pending, (state) => {
      state.update.pending = true;
      state.update.success = false;
      state.update.error = null;
    })
    .addCase(REQUEST_TODO_UPDATE.fulfilled, (state, { payload }) => {
      state.update.pending = false;
      state.update.success = true;
      state.update.data = payload.data;
      state.list.data = state.list.data.map((todo) =>
        todo.id === payload.data.id ? payload.data : todo
      );
      saveToLocalStorage(ELocalStorageKey.TODOS, state.list.data);
    })
    .addCase(REQUEST_TODO_UPDATE.rejected, (state, { payload }) => {
      state.update.pending = false;
      state.update.error = payload as AxiosError;
    });
});
