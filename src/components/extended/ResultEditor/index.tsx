// Do we need to reject TypeScript for this editor?
// For instance, eval is a bad word in TS because it is comically unsafe.
// But to me, it seems like we need this to execute items from the editor themselves.
// For now, I disabled that rule for the project. Consider custom disables.

import * as React from "react";
import AceEditor from "react-ace";

import "brace/mode/javascript";
import "brace/theme/twilight";
import "./ResultEditor.css";

interface DualEditorState {
  codeBuilder: string;
  transformTarget: Object;
  codeEval: string;
  badCodeEval: string | null;
}

// Value is just a string for single terminal and a tuple for double terminal
class AceEditorSplit extends React.Component<{}, DualEditorState> {
  constructor(props: Object) {
    super(props);

    this.state = this.getInitialState();

    this.onChange = this.onChange.bind(this);
    this.getInitialState = this.getInitialState.bind(this);
    this.clearResultField = this.clearResultField.bind(this);
    this.evalCodeTransformation = this.evalCodeTransformation.bind(this);
    this.replaceHolderWithObject = this.replaceHolderWithObject.bind(this);
  }

  getInitialState() {
    const instructionsLineOne = `/\* Example Function That Returns API Value Unchanged */ `;
    const instructionsLineTwo = `/\* apiReturn will be replaced with the API return value */`;

    const transformTarget = { foo: "bar", bah: "baz" };
    const exampleEditorFn = `${instructionsLineOne} \
      \nfunction identity(val) { return val }
      \n${instructionsLineTwo} \
      \nidentity(apiReturn);`;

    const apiReturnInstructions = `/\* Example API Return */ `;
    const exampleApiReturn = `${apiReturnInstructions} \
      \n${JSON.stringify(transformTarget, null, 2)}  
    `;

    return {
      codeBuilder: exampleEditorFn,
      transformTarget: transformTarget,
      codeEval: exampleApiReturn,
      badCodeEval: null
    };
  }

  onChange(newValue: string) {
    this.setState({ codeBuilder: newValue });
  }

  replaceHolderWithObject(evalCode: string) {
    const { codeBuilder, transformTarget } = this.state;

    return codeBuilder.replace(
      /\(apiReturn\)/i,
      `(${JSON.stringify(transformTarget)})`
    );
  }

  evalCodeTransformation() {
    // Replace placeholder text of "apiReturn" with actual API return val
    const evalCode = this.replaceHolderWithObject(this.state.codeBuilder);

    try {
      // Explicitly turned off the "no-eval" clause for this.
      const evaluatedFunction = eval(evalCode);
      this.setState({ codeEval: JSON.stringify(evaluatedFunction, null, 2) });
    } catch (err) {
      console.error("Large Explosion From Code Eval: ", err);

      this.setState({ codeEval: "" });
      // We can consider stripping new line characters than get stringified
      this.setState({
        badCodeEval: JSON.stringify(err, Object.getOwnPropertyNames(err), 2)
      });
    }
  }

  clearResultField() {
    this.setState({ codeEval: "" });
  }

  render() {
    const { badCodeEval, codeBuilder, codeEval } = this.state;
    return (
      <div>
        <div style={{ display: "inline-block" }}>
          <h2>Editor Input:</h2>
          <AceEditor
            mode="javascript"
            theme="twilight"
            value={codeBuilder}
            onChange={this.onChange}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            wrapEnabled={true}
          />
          <button
            onClick={this.evalCodeTransformation}
            className="editorButton"
          >
            Eval The Face!
          </button>
        </div>

        <div style={{ display: "inline-block" }}>
          <h2>Editor Output:</h2>
          <AceEditor
            mode="javascript"
            theme="twilight"
            value={badCodeEval != null ? badCodeEval : codeEval}
            name="outputAceEditor"
            editorProps={{ $blockScrolling: true }}
            wrapEnabled={true}
          />
          <button onClick={this.clearResultField} className="editorButton">
            Clear Contents
          </button>
        </div>
      </div>
    );
  }
}

export default AceEditorSplit;
