import { createReducer } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { IReduxState, reduxState } from "../useRedux";
import { ITodo } from "@app/libs/types/todo.types";
import { REQUEST_TODO_ADD } from "./action";

type ITodoState = {
  createState: IReduxState<ITodo[] | []>;
};

const initialState: ITodoState = {
  createState: { ...reduxState, data: [] },
};

export const TODO_REDUCER = createReducer(initialState, (builder) => {
  builder
    // ADD TODO
    .addCase(REQUEST_TODO_ADD.pending, (state) => {
      state.createState.pending = true;
      state.createState.success = false;
      state.createState.error = null;
    })
    .addCase(REQUEST_TODO_ADD.fulfilled, (state, { payload }) => {
      state.createState.pending = false;
      state.createState.success = true;
      state.createState.data = payload.data;
    })
    .addCase(REQUEST_TODO_ADD.rejected, (state, { payload }) => {
      state.createState.pending = false;
      state.createState.error = payload as AxiosError;
    });
});
