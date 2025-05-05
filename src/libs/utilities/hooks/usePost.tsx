import { useAppDispatch, useAppSelector } from "@app/libs/redux/useRedux";
import {
  POSTS_SELECTOR_COLLECTION,
  REQUEST_POST_LIST,
} from "@app/libs/redux/posts";
import { useCallback } from "react";
import { IPostParams } from "@app/libs/types/post.type";
import useResponse from "./useResponse";

const usePost = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(POSTS_SELECTOR_COLLECTION);
  const { handleError } = useResponse();

  const getList = useCallback(
    (params: IPostParams) => {
      dispatch(REQUEST_POST_LIST(params)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          handleError(500, "Oopss Something Went Wrong");
        }
      });
    },
    [dispatch, handleError]
  );

  return { ...state, getList };
};

export default usePost;
