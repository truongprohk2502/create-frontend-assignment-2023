import { FC } from "react";
import styles from "./Spinner.module.css";
import clsx from "clsx";

interface IProps {
  isFullscreen?: boolean;
  size?: "lg" | "sm";
  color?: "white" | "black";
}

const Spinner: FC<IProps> = ({
  isFullscreen,
  size = "sm",
  color = "white",
}) => {
  return isFullscreen ? (
    <div className={styles.container}>
      <div
        className={clsx(
          styles.spinner,
          styles.largeSpinner,
          styles.whiteSpinner
        )}
      />
    </div>
  ) : (
    <div
      className={clsx(styles.spinner, {
        [styles.largeSpinner]: size === "lg",
        [styles.smallSpinner]: size === "sm",
        [styles.whiteSpinner]: color === "white",
        [styles.blackSpinner]: color === "black",
      })}
    />
  );
};

export default Spinner;
