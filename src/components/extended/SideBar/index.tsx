import * as React from "react";
import { NavLink } from "react-router-dom";
import { classNameFactory } from "../../helpers";

import "./SideBar.css";

// Type Signatures To Be Moved to New Files:
export interface BasicRoute {
  classList?: Array<string>;
  fieldName: string;
  path: string;
}

export interface NavDetails extends BasicRoute {
  dropDownOptions?: Array<BasicRoute>;
  faIcon?: string;
}

export interface SubNavProps {
  navPillList: Array<BasicRoute>;
  display: boolean;
}

export interface SubNavState {
  active: boolean;
}

export interface SideBarProps {
  headerImage?: string;
  navDetails: Array<NavDetails>;
}
// ------------------------------------------

// Component To Create Optional SubNavComponent
class SubNavSelection extends React.Component<SubNavProps, SubNavState> {
  constructor(props: SubNavProps) {
    super(props);
  }

  renderNavPill(pathDetails: BasicRoute, i: number) {
    const { classList, fieldName, path } = pathDetails;
    const classes = classNameFactory("navPill", classList);

    return (
      <li key={i} className="subpill">
        <NavLink to={path} activeClassName="active" className={classes}>
          {fieldName}
        </NavLink>
      </li>
    );
  }

  render() {
    const { display, navPillList } = this.props;

    return (
      <ul className={`subNavContainer ${display ? "" : "navbar-hide"}`}>
        {navPillList.map((pill, i) => this.renderNavPill(pill, i))}
      </ul>
    );
  }
}

// Component For Individual Nav Row & Maybe SubList
class NavSelection extends React.Component<NavDetails, SubNavState> {
  constructor(props: NavDetails) {
    super(props);
    this.state = { active: false };

    this.makeDropDown = this.makeDropDown.bind(this);
    this.renderDropdownToggle = this.renderDropdownToggle.bind(this);
    this.toggleDropActive = this.toggleDropActive.bind(this);
  }

  makeDropDown(display: boolean, dropDownOptions?: Array<BasicRoute>) {
    if (dropDownOptions == null || dropDownOptions.length === 0) {
      return null;
    }

    return <SubNavSelection navPillList={dropDownOptions} display={display} />;
  }

  renderDropdownToggle() {
    return this.state.active ? (
      <i className="fa fa-angle-down" onClick={() => this.toggleDropActive()} />
    ) : (
      <i className="fa fa-angle-left" onClick={() => this.toggleDropActive()} />
    );
  }

  toggleDropActive() {
    this.setState({ active: !this.state.active });
  }

  render() {
    const { classList, dropDownOptions, faIcon, fieldName, path } = this.props;

    const classes = classNameFactory("navPill", classList);
    const faIconEl = <i className={`fa ${faIcon}`} />;
    const dropdownInterface = this.makeDropDown(
      this.state.active,
      dropDownOptions
    );

    return (
      <li>
        <NavLink to={path} activeClassName="active" className={classes}>
          {faIcon == null ? null : faIconEl}
          {fieldName}
        </NavLink>
        {dropdownInterface ? this.renderDropdownToggle() : null}
        {dropdownInterface}
      </li>
    );
  }
}

// Core Component to Combine Sidebar Functionality
class SideBar extends React.Component<SideBarProps, {}> {
  render() {
    const { navDetails } = this.props;

    return (
      <ul className="navBar">
        {navDetails.map((navPillDetails, i) => (
          <NavSelection {...navPillDetails} key={i} />
        ))}
      </ul>
    );
  }
}

export default SideBar;
