import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const AXIOS_JSONPLACEHOLDER_INSTANCE = axios.create({
  baseURL: process.env["NEXT_PUBLIC_JSONPLACEHOLDER"],
});

const AXIOS_LOCAL_INSTANCE = axios.create({
  baseURL: "/api",
});

const devLogger = (message: string) => {
  console.log("message", message);
};

// Request INTERCEPTOR
const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const { method, url } = config;

  devLogger(`[API] : ${method?.toUpperCase()} ${url} | Request`);
  return config;
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  const { method, url } = response.config;
  const { status } = response;

  devLogger(`[API] [${method?.toUpperCase()}]:  ${url} | Response ${status}`);
  return response;
};

const onErrorResponse = (error: AxiosError | Error): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    const { message } = error;
    const { method, url } = error.config as InternalAxiosRequestConfig;
    const { statusText, status } = (error.response as AxiosResponse) ?? {};

    devLogger(
      `[API] : ${method?.toUpperCase()} ${url} | Error ${status} ${message} ${statusText}`
    );
  } else {
    devLogger(`[API] | Error ${error.message}`);
  }
  return Promise.reject(error);
};

const setupInterceptors = (AXIOS_INSTANCE: AxiosInstance): AxiosInstance => {
  AXIOS_INSTANCE.interceptors.request.use(onRequest, onErrorResponse);
  AXIOS_INSTANCE.interceptors.response.use(onResponse, onErrorResponse);
  return AXIOS_INSTANCE;
};

export const REQUEST_JSON_PLACEHOLDER = setupInterceptors(
  AXIOS_JSONPLACEHOLDER_INSTANCE
);
export const REQUEST_LOCAL = setupInterceptors(AXIOS_LOCAL_INSTANCE);
