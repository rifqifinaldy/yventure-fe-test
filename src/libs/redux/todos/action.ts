import { REQUEST_LOCAL } from "@app/libs/axios";
import { ITodo } from "@app/libs/types/todo.types";
import { API_LOCAL } from "@app/libs/utilities/constant/api-collection.constant";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const REQUEST_TODO_ADD = createAsyncThunk(
  "todo/create",
  async (payload: ITodo, { rejectWithValue }) => {
    try {
      const response = await REQUEST_LOCAL.post(API_LOCAL.TODO.ADD, payload);
      console.log("PAYLOAD ACTION", payload, response);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
