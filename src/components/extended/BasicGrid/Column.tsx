import * as React from "react";

// --- Types
type Styles = React.CSSProperties;

export interface ColumnProps {
  flexOverride?: Styles;
  renderComponent?: Function;
  styles?: Styles;
  value?: string;
}

// --- Helpers
function applyStyles(styles?: Styles, flexOverride?: Styles): Styles {
  const flexDefault = { alignSelf: "flex-start", flex: 1 };

  // If both optional params are missing, return the default style
  if (styles == null && flexOverride == null) {
    return flexDefault as Styles;
  }

  // If there is no flex override, merge styles with flex
  if (flexOverride == null) {
    return Object.assign(flexDefault, styles);
  }

  // Otherwise, we have both options and need to merge them together properly
  // TODO: Consider simply throwing away the flexDefault if more intuitive
  const flexStyles = Object.assign(flexDefault, flexOverride);
  const combinedStyles = Object.assign(flexStyles, styles);
  return combinedStyles;
}

// --- Column Component
class BasicColumn extends React.Component<ColumnProps, {}> {
  constructor(props: Object) {
    super(props);
  }

  render() {
    const { flexOverride, renderComponent, styles, value } = this.props;
    const output = renderComponent != null ? renderComponent() : value;

    return <div style={applyStyles(styles, flexOverride)}>{output}</div>;
  }
}

export default BasicColumn;
