import * as React from "react";
import "./GridSystem.css";

// --- TODO
// Setup different sizes for your grid
// Each size represents a breakpoint
// We state the amount of columns it must add to for each
// i.e. xs="12" / sm="6" / md="8"

// --- High Level
// I want this interface to look something like:
// - Take a list of objects w/ render function & flex details
// - Take those render FNs and custom grid info and apply to grid
// - Render

export interface SizeWidthOpts {
  xsWidth?: number;
  sWidth?: number;
  mdWidth?: number;
  lgWidth?: number;
  xlWidth?: number;
}

export interface RenderDetails {
  renderFn: Function;
  normalWidth: number;
  order: number;
  colStyles?: Object;
}

type ColumnList = Array<RenderDetails>;

export interface GridProps {
  rows: Array<ColumnList>;
}

interface RowProps {
  columnDetails: ColumnList;
}

// --- Row Component
class Row extends React.Component<RowProps, {}> {
  constructor(props: RowProps) {
    super(props);
  }

  render() {
    const { columnDetails } = this.props;
    return (
      <div className="flexContainer">
        {columnDetails.map(details => (
          <div className="column">{details.renderFn()}</div>
        ))}
      </div>
    );
  }
}

// --- Grid Component
class Grid extends React.Component<GridProps, {}> {
  constructor(props: GridProps) {
    super(props);
  }

  render() {
    const { rows } = this.props;
    return (
      <div style={{ width: "100%" }}>
        {rows.map((columnDetails, i) => (
          <Row columnDetails={columnDetails} key={i} />
        ))}
      </div>
    );
  }
}

export default Grid;
