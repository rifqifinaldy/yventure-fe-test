import { createReducer } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { IReduxState, reduxState } from "../useRedux";
import { ITodo } from "@app/libs/types/todo.types";
import { REQUEST_TODO_ADD, REQUEST_TODO_LIST } from "./action";
import { ELocalStorageKey } from "@app/libs/types/key.types";
import { saveToLocalStorage } from "@app/libs/utilities/helper/save-to-local.helper";

type ITodoState = {
  create: IReduxState<ITodo | null>;
  list: IReduxState<ITodo[] | []>;
};

const initialState: ITodoState = {
  create: { ...reduxState, data: null },
  list: { ...reduxState, data: [] },
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
    });
});
