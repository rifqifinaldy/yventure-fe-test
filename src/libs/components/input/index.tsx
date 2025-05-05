import React from "react";
import { useFormContext } from "react-hook-form";
import styles from "./style.module.scss";
import Spinner from "../spinner";

interface Props {
  id: string;
  name: string;
  inputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  label?: string;
  errorMessage?: string;
  isLoading?: boolean;
}

const InputField: React.FC<Props> = ({
  inputProps,
  id,
  name,
  label,
  errorMessage,
  isLoading = false,
}) => {
  const { register } = useFormContext();

  const inputClass = [
    styles.input_field,
    errorMessage ? styles.error : "",
    isLoading ? styles.loading : "",
  ].join(" ");

  return (
    <div className={styles.input_wrapper}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.input_container}>
        <input
          id={id}
          {...register(name)}
          {...inputProps}
          disabled={inputProps?.disabled}
          className={inputClass}
        />
        {isLoading && (
          <div className={styles.input_spinner}>
            <Spinner />
          </div>
        )}
      </div>
      {errorMessage && (
        <span className={styles.input_error}>{errorMessage}</span>
      )}
    </div>
  );
};

export default InputField;
