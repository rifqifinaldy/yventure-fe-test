import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";
import { AxiosError } from "axios";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export interface IReduxState<T> {
  data?: T;
  pending: boolean;
  success: boolean;
  error: null | AxiosError;
}

export const reduxState = {
  pending: false,
  success: false,
  error: null,
};
