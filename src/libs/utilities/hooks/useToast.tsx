import { toast, ToastOptions } from "react-toastify";

export type ToastOptionState = ToastOptions<unknown> | undefined;

const useToast = () => {
  const config: ToastOptionState = {
    position: "top-center",
    closeOnClick: true,
    hideProgressBar: false,
    autoClose: 5000,
  };

  const showToast = (message?: string, options?: ToastOptionState) =>
    toast(message, { ...config, ...options });

  return { showToast };
};

export default useToast;
