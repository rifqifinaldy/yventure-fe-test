import { useCallback, useMemo } from "react";
import { toast, ToastOptions } from "react-toastify";

export type ToastOptionState = ToastOptions<unknown> | undefined;

const useToast = () => {
  const config = useMemo(
    (): ToastOptionState => ({
      position: "top-center",
      closeOnClick: true,
      hideProgressBar: false,
      autoClose: 3000,
    }),
    []
  );

  const showToast = useCallback(
    (message: string, options: ToastOptionState) => {
      toast(message, { ...config, ...options });
    },
    [config]
  );

  return { showToast };
};

export default useToast;
