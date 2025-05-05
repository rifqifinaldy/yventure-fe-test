import * as yup from "yup";

export const validateTodo = yup.object({
  id: yup.string().nullable(),
  isCompleted: yup.boolean(),
  task: yup
    .string()
    .required("Please Specify Your Task")
    .min(3, "Task must be at least 3 characters")
    .max(30, "Task must be no more than 50 characters"),
});
