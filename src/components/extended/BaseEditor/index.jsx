// For the split editor, we need to write custom typing if we're to use it.
// The current typing doesn't know about the SplitEditor at all.

import * as React from "react";
import AceEditor from "react-ace";

import "brace/mode/javascript";
import "brace/theme/twilight";

// Value is just a string for single terminal and a tuple for double terminal
class AceEditorSplit extends React.Component {
  constructor(props) {
    super(props);
    const instructionsLineOne = `/\* Example Function That Returns API Value Unchanged */ `;
    const instructionsLineTwo = `/\* apiReturn will be replaced with the API return value */`;

    const exampleEditorFn = `${instructionsLineOne} \
      \nfunction identity(val) { return val }
      \n${instructionsLineTwo} \
      \nidentity(apiReturn);`;

    this.state = {
      codeBuilder: exampleEditorFn,
      transformTarget: { foo: "bar", bah: "baz" },
      codeEval: "",
      badCodeEval: null
    };

    this.onChange = this.onChange.bind(this);
    this.evalCodeTransformation = this.evalCodeTransformation.bind(this);
    this.replaceHolderWithObject = this.replaceHolderWithObject.bind(this);
  }

  onChange(newValue) {
    this.setState({ codeBuilder: newValue });
  }

  replaceHolderWithObject(evalCode) {
    const { codeBuilder, transformTarget } = this.state;

    return this.state.codeBuilder.replace(
      /\(apiReturn\)/i,
      `(${JSON.stringify(transformTarget)})`
    );
  }

  evalCodeTransformation() {
    // Replace placeholder text of "apiReturn" with actual API return val
    const evalCode = this.replaceHolderWithObject(this.state.codeBuilder);

    try {
      const evaluatedFunction = eval(evalCode);
      this.setState({ codeEval: JSON.stringify(evaluatedFunction) });
    } catch (err) {
      console.error("Large Explosion From Code Eval: ", err);

      this.setState({ codeEval: "" });
      this.setState({
        badCodeEval: JSON.stringify(err, Object.getOwnPropertyNames(err))
      });
    }
  }

  render() {
    const { badCodeEval, codeBuilder } = this.state;
    return (
      <div>
        <AceEditor
          mode="javascript"
          theme="twilight"
          value={codeBuilder}
          onChange={this.onChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
        />
        <button onClick={this.evalCodeTransformation}>Eval The Face!</button>
        {/* Baby Simple Result Display and Error Handling */}
        <h3>Your Result is! {this.state.codeEval}</h3>
        {badCodeEval != null ? (
          <span>{badCodeEval}</span>
        ) : (
          <span>No Error</span>
        )}
      </div>
    );
  }
}

export default AceEditorSplit;
