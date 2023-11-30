import { MouseEventHandler } from "react";

export interface CustomButtonProp {
  title: string;

  handleClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  onClick?: () => void;
  logtrial?: () => void;
}
