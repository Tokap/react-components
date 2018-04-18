import * as React from "react";
import ResultEditor from "../extended/ResultEditor";

class AccessTokens extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Text Editor</h1>
          <h2 className="App-content">
            Please enjoy this text editor that can execute transformation code.
          </h2>
        </header>
        <ResultEditor />
      </div>
    );
  }
}

export default AccessTokens;
