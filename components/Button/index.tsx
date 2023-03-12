import clsx from "clsx";
import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import Spinner from "../Spinner";
import styles from "./Button.module.css";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: ReactNode;
}

const Button: FC<IProps> = ({ loading, children, className, ...props }) => {
  return (
    <button {...props} className={clsx(className, styles.container)}>
      {loading && (
        <div className={styles.spinnerContainer}>
          <Spinner size="sm" color="black" />
        </div>
      )}
      {children}
    </button>
  );
};

export default Button;
