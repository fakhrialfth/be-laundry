import { ComponentProps, FC } from "react";
import { classNames } from "./class-names";
import styles from "./InlineCode.module.css";

export const InlineCode: FC<ComponentProps<"code">> = ({
  className,
  ...props
}) => {
  return (
    <code className={classNames(styles.inlineCode, className)} {...props} />
  );
};
