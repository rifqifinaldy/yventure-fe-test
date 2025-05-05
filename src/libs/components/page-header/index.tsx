import React from "react";
import styles from "./style.module.scss";

interface Props {
  title: string;
  subtitle?: string;
}

const PageTitle: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <section className={styles.wrapper}>
      <h1 data-testid="page-title" className={styles.title}>
        {title}
      </h1>
      {subtitle && (
        <h4 data-testid="page-subtitle" className={styles.subtitle}>
          {subtitle}
        </h4>
      )}
      <div data-testid="divider" className={styles.divider} />
    </section>
  );
};

export default PageTitle;
