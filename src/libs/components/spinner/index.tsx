import React from "react";
import classNames from "classnames";
import styles from "./style.module.scss";

interface Props {
  variant?: "green" | "blue" | "red" | "gray" | "black";
  size?: "sm" | "md" | "lg";
}

const Spinner: React.FC<Props> = ({ variant = "gray", size = "md" }) => {
  const spinnerClass = classNames(
    styles.loading_spinner,
    styles[variant],
    styles[size]
  );

  return <span className={spinnerClass} />;
};

export default Spinner;
