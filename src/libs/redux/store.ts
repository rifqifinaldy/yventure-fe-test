import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import { TODO_REDUCER } from "./todos";
import REDUX_MIDDLEWARE from "./redux.middleware";

export const store = () => {
  return configureStore({
    reducer: {
      todos: TODO_REDUCER,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(REDUX_MIDDLEWARE),
  });
};

export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
