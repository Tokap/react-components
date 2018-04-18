import * as React from "react";

import "./TextHolder.css";

export interface Props {
  fieldName: string;
  setTopLevelState: Function;
}

// Notice how the function knows the type sig of the deconstructed Props interface.
function TextHolder({ fieldName, setTopLevelState }: Props) {
  return (
    <input
      type="text"
      name={fieldName}
      onChange={e => setTopLevelState({ [fieldName]: e.target.value })}
    />
  );
}

export default TextHolder;

// We can always use the prop name here to be consistent. Then, our
// update FNs should be consistent across the board as well.

// I'm beginning to like the pattern of extremely generic
// components that receive the entire state object
// and from there determine how to proceed. This allows us
// to use wrappers for heavy customization or simply
// pass props for more simple implementation.
