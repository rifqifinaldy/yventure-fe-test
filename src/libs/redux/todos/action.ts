import { REQUEST_LOCAL } from "@app/libs/axios";
import { ITodoPayload } from "@app/libs/types/todo.types";
import { API_LOCAL } from "@app/libs/utilities/constant/api-collection.constant";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const REQUEST_TODO_ADD = createAsyncThunk(
  "todo/create",
  async (payload: ITodoPayload, { rejectWithValue }) => {
    try {
      const response = await REQUEST_LOCAL.post(API_LOCAL.TODO.ADD, payload);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const REQUEST_TODO_LIST = createAsyncThunk(
  "todo/list",
  async (_, { rejectWithValue }) => {
    let savedTodos = localStorage.getItem("todos");
    console.log("SAVED TODOS", savedTodos);
    if (savedTodos === null) {
      savedTodos = "[]";
    } else {
      savedTodos = savedTodos;
    }
    try {
      console.log("SAVED TODOS", savedTodos);
      const response = await REQUEST_LOCAL.get(API_LOCAL.TODO.LIST, {
        params: { datas: savedTodos },
      });
      return response.data;
    } catch (err) {
      console.log("ERR", err);
      return rejectWithValue(err);
    }
  }
);
