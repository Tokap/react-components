import * as React from "react";
import FullModal from "../extended/ContactModal";
import GenericModal from "../extended/GenericModal";

const renderThing = () => <div>Oh Hello There!</div>;

class QueryLanguage extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Modals a go-go.</h1>
          <h2 className="App-content">Here are some words regarding Modals.</h2>
          <FullModal />
          <GenericModal renderFunction={renderThing} />
        </header>
      </div>
    );
  }
}

export default QueryLanguage;
