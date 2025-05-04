import { TLocalStorageKey } from "@app/libs/types/key.types";

export const saveToLocalStorage = (key: TLocalStorageKey, data: unknown) =>
  localStorage.setItem(key, JSON.stringify(data));
