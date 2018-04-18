import * as React from "react";

export interface ButtonOptions {
  size: "sm" | "md" | "lg";
  text: string;
  classList?: Array<string>;
  onClickFn: () => void;
}

function StandardButton({ classList, onClickFn, size, text }: ButtonOptions) {
  let classes = "button";

  // Configure Button Size Style
  if (size === "sm") {
    classes += " sm";
  }
  if (size === "md") {
    classes += " md";
  }
  if (size === "lg") {
    classes += " lg";
  }

  // Add Additional Classes
  if (classList != null || classList !== undefined) {
    classes = classList.reduce(
      (acc, className) => `${acc} ${className}`,
      classes
    );
  }

  // Render Button1
  return (
    <button onClick={onClickFn} className={classes}>
      {text}
    </button>
  );
}

export default StandardButton;
