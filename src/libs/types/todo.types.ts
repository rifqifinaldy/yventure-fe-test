export interface ITodo {
  id: string;
  task: string | undefined;
  updatedAt: string;
  isCompleted?: boolean | null;
}

export type ITodoPayload = Omit<ITodo, "id">;
