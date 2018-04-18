import * as React from "react";
import TextHolder from "../sfc/TextHolder";

// --- Import Required Types:
import { State, FieldProps } from "../../types";

const renderTextHolder = (topLevelState: State, fieldName: string) => {
  const { setTopLevelState } = topLevelState;

  return (
    <div>
      <h2>
        {fieldName}: {topLevelState[fieldName]}
      </h2>
      <TextHolder fieldName={fieldName} setTopLevelState={setTopLevelState} />
    </div>
  );
};

// --- Actual Page Rendering
class Forms extends React.Component<FieldProps, {}> {
  render() {
    const { topLevelState } = this.props;

    return (
      <div>
        <h1>Look a Header!</h1>
        {renderTextHolder(topLevelState, "name")}
        {renderTextHolder(topLevelState, "address")}
        {renderTextHolder(topLevelState, "phone")}
      </div>
    );
  }
}

export default Forms;
