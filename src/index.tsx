import * as React from "react";
import * as ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";

import FullApp from "./components/extended/FullApp";
import "./index.css";

ReactDOM.render(
  <FullApp />,

  // Confirm/coerce the return type
  document.getElementById("root") as HTMLElement
);

registerServiceWorker();
