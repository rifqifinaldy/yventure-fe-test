import React from "react";
import styles from "./style.module.scss";
import Spinner from "../spinner";

interface Props {
  title?: string;
}

const PageLoader: React.FC<Props> = ({ title = "Loading ..." }) => {
  return (
    <div className={styles.page_loader}>
      <Spinner size="lg" variant="blue" />
      <div className={styles.message}>{title}</div>
    </div>
  );
};

export default PageLoader;
