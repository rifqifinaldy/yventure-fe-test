import { useCallback, useRef, useState } from "react";

const useDebounce = <T extends (...args: never[]) => void>(
  callback: T,
  delay: number
) => {
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);

  return {
    debounce: useCallback(
      (...args: Parameters<T>) => {
        setLoading(true);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(() => {
          callback(...args);
          setLoading(false);
        }, delay);
      },
      [callback, delay]
    ),
    loading,
  };
};

export default useDebounce;
