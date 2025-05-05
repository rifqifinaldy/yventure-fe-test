import React from "react";
import classNames from "classnames"; // Utility to conditionally join class names
import styles from "./style.module.scss";
import Spinner from "../spinner";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isLoading?: boolean;
  colorScheme?: "green" | "blue" | "red" | "yellow";
  children: string | React.ReactNode;
}

const Button: React.FC<Props> = ({
  children,
  isLoading,
  disabled,
  colorScheme = "blue",
  ...rest
}) => {
  const buttonClass = classNames(styles.button, styles[colorScheme]);

  return (
    <button className={buttonClass} disabled={isLoading || disabled} {...rest}>
      {isLoading && <Spinner />}
      {children}
    </button>
  );
};

export default Button;
