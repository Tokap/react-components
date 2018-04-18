import * as React from "react";
import { NavLink } from "react-router-dom";
import { classNameFactory } from "../../helpers";

import "./BreadCrumb.css";

// Type Signatures To Be Moved to New Files:
export interface BasicRoute {
  classList?: Array<string>;
  fieldName: string;
  path: string;
}

export interface BreadCrumbProps {
  classList?: Array<string>;
  navPillList: Array<BasicRoute>;
}
// ------------------------------------------
class BreadCrumb extends React.Component<BreadCrumbProps, {}> {
  constructor(props: BreadCrumbProps) {
    super(props);

    this.renderNavPill = this.renderNavPill.bind(this);
  }

  renderNavPill(pathDetails: BasicRoute, idx: number, len: number) {
    const { classList, fieldName, path } = pathDetails;
    const classes = classNameFactory("breadcrumb-option", classList);

    return (
      <li key={idx} className={classes}>
        <NavLink to={path} activeClassName="active" className="crumbPill">
          {fieldName}
        </NavLink>

        {/* Render Spacer between breadcrumbs if not final idx */}
        {idx !== len - 1 ? <span>/</span> : <i />}
      </li>
    );
  }

  render() {
    const { navPillList, classList } = this.props;
    const classes = classNameFactory("breadcrumb-holder", classList);

    return (
      <ul className={classes}>
        {navPillList.map((pill, i) =>
          this.renderNavPill(pill, i, navPillList.length)
        )}
      </ul>
    );
  }
}

export default BreadCrumb;
