import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const TODOS_SELECTOR = (state: RootState) => state.todos;

export const TODOS_SELECTOR_COLLECTION = createSelector(
  TODOS_SELECTOR,
  (state) => state,
  {
    devModeChecks: { identityFunctionCheck: "never" },
  }
);
