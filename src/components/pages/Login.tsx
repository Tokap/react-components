import * as React from "react";
import Login from "../extended/Login";

class ProductFaq extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Login.</h1>
          <h2 className="App-content">Here are some words regarding Login.</h2>
          <p>And some additional text.</p>

          <Login targetUrl={"http://localhost:400/api/login"} />
        </header>
      </div>
    );
  }
}

export default ProductFaq;
