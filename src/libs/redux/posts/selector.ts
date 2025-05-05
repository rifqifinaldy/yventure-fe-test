import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const POSTS_SELECTOR = (state: RootState) => state.posts;

export const POSTS_SELECTOR_COLLECTION = createSelector(
  POSTS_SELECTOR,
  (state) => state,
  {
    devModeChecks: { identityFunctionCheck: "never" },
  }
);
