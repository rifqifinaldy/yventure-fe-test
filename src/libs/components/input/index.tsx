import React from "react";
import { useFormContext } from "react-hook-form";
import styles from "./style.module.scss";

interface Props {
  id: string;
  name: string;
  inputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  label?: string;
  errorMessage?: string;
}

const InputField: React.FC<Props> = ({
  inputProps,
  id,
  name,
  label,
  errorMessage,
}) => {
  const { register } = useFormContext();

  const inputClass = errorMessage
    ? `${styles.input_field} ${styles.error}`
    : styles.input_field;

  return (
    <div className={styles.input_wrapper}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={id}
        {...register(name)}
        {...inputProps}
        className={inputClass}
      />
      {errorMessage && (
        <span className={styles.input_error}>{errorMessage}</span>
      )}
    </div>
  );
};

export default InputField;
