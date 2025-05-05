import { createReducer } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { IReduxState, reduxState } from "../useRedux";
import { IPost } from "@app/libs/types/post.type";
import { REQUEST_POST_LIST } from "./action";

type ITodoState = {
  list: IReduxState<IPost[] | []>;
};

const initialState: ITodoState = {
  list: { ...reduxState, data: [] },
};

export const POST_REDUCER = createReducer(initialState, (builder) => {
  builder
    // List of Post Item
    .addCase(REQUEST_POST_LIST.pending, (state) => {
      state.list.pending = true;
      state.list.success = false;
      state.list.error = null;
    })
    .addCase(REQUEST_POST_LIST.fulfilled, (state, { payload }) => {
      state.list.pending = false;
      state.list.success = true;
      state.list.data = payload.data;
    })
    .addCase(REQUEST_POST_LIST.rejected, (state, { payload }) => {
      state.list.pending = false;
      state.list.error = payload as AxiosError;
    });
});
