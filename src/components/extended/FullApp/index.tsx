// --- Basic React imports
import * as React from "react";

// --- Redux Imports & General Functionality
import TextEditor from "../../pages/TextEditor";
import Forms from "../../pages/Forms";
import Overview from "../../pages/Overview";
import LoginPage from "../../pages/Login";
import ModalTests from "../../pages/ModalTestPage";
import Tutorials from "../../pages/GridPage";

import SideBar from "../SideBar";

// --- Style Import
import "./FullApp.css";

// --- React Router Imports
import { BrowserRouter, Route } from "react-router-dom";

// --- Import Required Types:
import { State } from "../../../types";

import sideBarList from "../SideBar/AppSpecific";

// Wrapped Application to Store State
class FullApp extends React.Component<{}, State> {
  constructor(props: Object) {
    super(props);

    this.state = this.getInitialState();

    this.getInitialState = this.getInitialState.bind(this);
  }

  getInitialState() {
    // --- Full State Object
    return {
      userId: 1,
      name: "",
      address: "",
      phone: "",
      dateTime: { from: null, to: null },
      // State Functions:
      setTopLevelState: this.setState.bind(this)
    };
  }

  // The pattern should be to pass in the top level state to the page component.
  // The page component will then deconstruct and pass through what it needs to
  // render the components it holds.
  render() {
    return (
      <BrowserRouter>
        <div className="flex-grid" style={{ height: "100%" }}>
          <SideBar navDetails={sideBarList} />

          <Route
            path="/"
            render={() => <Overview {...this.state} />}
            exact={true}
          />

          <Route
            path="/form/page"
            render={() => <Forms topLevelState={this.state} />}
            exact={true}
          />

          <Route path="/grids" render={() => <Tutorials />} exact={true} />

          <Route path="/modal" render={() => <ModalTests />} exact={true} />

          <Route
            path="/text_editor"
            render={() => <TextEditor />}
            exact={true}
          />

          <Route path="/login" render={() => <LoginPage />} exact={true} />

          {/* Example Receipt of Params from Url */}
          <Route
            path="/user/:id"
            render={({ match }) => <div> {match.params.id} </div>}
            exact={true}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default FullApp;
