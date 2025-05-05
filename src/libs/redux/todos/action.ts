import { REQUEST_LOCAL } from "@app/libs/axios";
import { ITodo, ITodoPayload } from "@app/libs/types/todo.types";
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
    if (savedTodos === null) {
      savedTodos = "[]";
    } else {
      savedTodos = savedTodos;
    }
    try {
      const response = await REQUEST_LOCAL.get(API_LOCAL.TODO.LIST, {
        params: { datas: savedTodos },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const REQUEST_TODO_DELETE = createAsyncThunk(
  "todo/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await REQUEST_LOCAL.delete(API_LOCAL.TODO.DELETE(id));
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const REQUEST_TODO_UPDATE = createAsyncThunk(
  "todo/update",
  async (payload: ITodo, { rejectWithValue }) => {
    try {
      const response = await REQUEST_LOCAL.put(
        API_LOCAL.TODO.UPDATE(payload.id),
        payload
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
