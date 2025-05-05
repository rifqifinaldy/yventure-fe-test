import React from "react";
import styles from "./style.module.scss";
import { FiInbox } from "react-icons/fi";

interface Props {
  title: string;
  subtitle?: string;
}

const EmptyState: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <div className={styles.empty_state}>
      <FiInbox className={styles.icon} />
      <div className={styles.message}>{title}</div>
      <div className={styles.sub_message}>{subtitle}</div>
    </div>
  );
};

export default EmptyState;
