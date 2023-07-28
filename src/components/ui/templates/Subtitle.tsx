import { ComponentProps, FC } from "react";
import { classNames } from "./class-names";
import styles from "./Subtitle.module.css";

export const Subtitle: FC<ComponentProps<"p">> = ({ className, ...props }) => {
  return <p className={classNames(styles.subtitle, className)} {...props} />;
};
