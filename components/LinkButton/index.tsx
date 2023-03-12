import Link from "next/link";
import { FC } from "react";
import styles from "./LinkButton.module.css";

interface IProps {
  href: string;
  children: string;
}

const LinkButton: FC<IProps> = ({ href, children }) => {
  return (
    <Link href={href} passHref legacyBehavior>
      <a className={styles.container}>{children}</a>
    </Link>
  );
};

export default LinkButton;
