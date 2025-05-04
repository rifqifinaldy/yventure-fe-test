import { useCallback } from "react";
import useToast from "./useToast";
import { ToastOptions } from "react-toastify";

const useResponse = () => {
  const { showToast } = useToast();

  const handleSuccess = useCallback(
    (message: string) => {
      showToast(message, { type: "success", closeOnClick: true });
    },
    [showToast]
  );

  const handleError = useCallback(
    (errorCode: number, message?: string) => {
      const typeMap: Record<number, ToastOptions["type"]> = {
        400: "warning",
        404: "warning",
        500: "error",
      };

      const type = typeMap[errorCode] || "error";

      showToast(message || "An unexpected error occurred.", { type });
    },
    [showToast]
  );

  return { handleSuccess, handleError };
};

export default useResponse;
