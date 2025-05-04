export interface ITodo {
  id: string;
  task: string | undefined;
  isCompleted?: boolean | null;
}

export type ITodoPayload = Omit<ITodo, "id">;
