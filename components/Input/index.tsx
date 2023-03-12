import { FC, InputHTMLAttributes } from "react";
import styles from "./Input.module.css";
import clsx from "clsx";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: any;
}

const Input: FC<IProps> = ({ label, error, className, ...props }) => {
  return (
    <div className={clsx(styles.container, className)}>
      <label>{label}</label>
      <input {...props} />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default Input;
