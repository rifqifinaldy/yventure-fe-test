import { REQUEST_JSON_PLACEHOLDER } from "@app/libs/axios";
import { IPostParams } from "@app/libs/types/post.type";
import { API_JSON_PLACEHOLDER } from "@app/libs/utilities/constant/api-collection.constant";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const REQUEST_POST_LIST = createAsyncThunk(
  "post/list",
  async (params: IPostParams, { rejectWithValue }) => {
    try {
      const response = await REQUEST_JSON_PLACEHOLDER.get(
        API_JSON_PLACEHOLDER.POST.LIST,
        { params: params }
      );
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
