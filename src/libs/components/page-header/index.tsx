import React from "react";
import styles from "./style.module.scss";

interface Props {
  title: string;
  subtitle?: string;
}

const PageTitle: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>{title}</h1>
      <h4 className={styles.subtitle}>{subtitle}</h4>
      <div className={styles.divider} />
    </section>
  );
};

export default PageTitle;
