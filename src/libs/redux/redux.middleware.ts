import { Middleware, isFulfilled } from "@reduxjs/toolkit";

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const REDUX_MIDDLEWARE: Middleware = () => (next) => async (action) => {
  if (isFulfilled(action)) {
    await delay(1500);
  }
  return next(action);
};

export default REDUX_MIDDLEWARE;
