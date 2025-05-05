import { ITodo } from "@app/libs/types/todo.types";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import styles from "./style.module.scss";
import React from "react";

interface Props {
  todo: ITodo;
  isEditing: boolean;
  isLoading: boolean;
  handleDelete: (id: string) => void;
  handleEdit: (data: ITodo) => void;
  handleToggle: (data: ITodo) => void;
}

const TodoCard: React.FC<Props> = ({
  todo,
  isEditing,
  isLoading,
  handleDelete,
  handleEdit,
  handleToggle,
}) => {
  const { task, isCompleted, updatedAt } = todo;

  const wrapperStyles = isEditing
    ? `${styles.card_wrapper} ${styles.active}`
    : styles.card_wrapper;

  return (
    <div className={wrapperStyles}>
      {isLoading && (
        <div className={styles.loading_overlay}>
          <span className={styles.spinner}></span>
        </div>
      )}

      <div className={styles.right_content_wrapper}>
        <div className={styles.checkbox_wrapper}>
          <input
            type="checkbox"
            checked={Boolean(isCompleted)}
            onChange={(e) =>
              handleToggle({ ...todo, isCompleted: e.currentTarget.checked })
            }
          />
        </div>
        <div className={styles.content_wrapper}>
          <h6 className={styles.update_text}>Last Updated: {updatedAt}</h6>
          <p className={styles.description}>{task}</p>
        </div>
      </div>
      <div className={styles.action_wrapper}>
        <AiFillDelete onClick={() => handleDelete(todo.id)} />
        <AiFillEdit onClick={() => handleEdit(todo)} />
      </div>
    </div>
  );
};

export default TodoCard;
