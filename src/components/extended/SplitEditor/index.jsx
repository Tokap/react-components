// For the split editor, we need to write custom typing if we're to use it.
// The current typing doesn't know about the SplitEditor at all.

import * as React from "react";
import { split as SplitEditor } from "react-ace";

import "brace/mode/javascript";
import "brace/theme/twilight";

// Orientation Options:
//  - "beside"
//  - "below"

class AceEditorSplit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <SplitEditor
          ref="aceEditor"
          mode="javascript"
          theme="twilight"
          splits={2}
          orientation="beside"
          value={[
            "console.log('some starting code')",
            "function lessImpressiveCode(){ return null }"
          ]}
          name="UNIQUE_ID_OF_DIV"
          // editorProps={{ $blockScrolling: true }}
        />
        <button
          onClick={() =>
            console.info(this.refs.aceEditor.editor.getSelectedText())
          }
        >
          Test Me Beautiful
        </button>
      </div>
    );
  }
}

export default AceEditorSplit;
