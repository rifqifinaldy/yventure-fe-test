export const API_LOCAL = {
  TODO: {
    ADD: "/todo/add",
    LIST: "/todo/list",
    DELETE: (id: string) => `/todo/delete/${id}`,
    UPDATE: (id: string) => `/todo/update/${id}`,
  },
};

export const API_JSON_PLACEHOLDER = {
  POST: {
    LIST: "/posts",
  },
};
