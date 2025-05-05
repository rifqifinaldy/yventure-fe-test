import { IPost } from "@app/libs/types/post.type";
import styles from "./style.module.scss";
import React from "react";

interface Props {
  post: IPost;
}

const PostCard: React.FC<Props> = ({ post }) => {
  const { body, id, title, userId } = post;

  return (
    <div className={styles.card_wrapper}>
      <div className={styles.card_header}>
        <h4 className={styles.subject}>
          User ID : <span className={styles.subject_value}>{userId}</span>
        </h4>
        <span className={styles.id}>{id}</span>
      </div>
      <div className={styles.card_content}>
        <h6 className={styles.post_title}>{title}</h6>
        <q className={styles.post_body}>{body}</q>
      </div>
    </div>
  );
};

export default PostCard;
