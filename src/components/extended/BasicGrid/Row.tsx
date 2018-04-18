import * as React from "react";
import BasicColumn, { ColumnProps } from "./Column";
import "./BasicGrid.css";

// --- Types
type ColumnDetails = {
  columnPropsList: Array<ColumnProps>;
};

class BasicRow extends React.Component<ColumnDetails, {}> {
  constructor(props: ColumnDetails) {
    super(props);
  }

  render() {
    const { columnPropsList } = this.props;

    return (
      <div className="basicGrid">
        {columnPropsList.map((colProps, i) => (
          <BasicColumn {...colProps} key={i} />
        ))}
      </div>
    );
  }
}

export default BasicRow;
