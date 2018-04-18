import * as React from "react";
import { ColumnProps } from "./Column";
import BasicRow from "./Row";

import "./BasicGrid.css";
// --- Structs
type RowPropsList = Array<Array<ColumnProps>>;

interface GridProps {
  rowPropsList: RowPropsList;
}

// --- Grid Component
class BasicGrid extends React.Component<GridProps, {}> {
  constructor(props: GridProps) {
    super(props);
  }

  render() {
    const { rowPropsList } = this.props;
    return (
      <div className="gridContainer">
        {rowPropsList.map((rowList, i) => (
          <BasicRow columnPropsList={rowList} key={i} />
        ))}
      </div>
    );
  }
}

export default BasicGrid;
