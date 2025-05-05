export const API_LOCAL = {
  TODO: {
    ADD: "/todo/add",
    LIST: "/todo/list",
    DELETE: (id: string) => `/todo/delete/${id}`,
  },
};
