import * as React from "react";
// import Grid from "../../extended/GridSystem";
import BasicGrid from "../../extended/BasicGrid";
import LazyLoad from "react-lazy-load";

// const renderHello = () => <span>Hello</span>;
// const renderBye = () => <span>Goodbye</span>;
// const renderFarewell = () => <span>Farewell</span>;

// const renderNext = () => <span>Next</span>;
const renderTest = () => <span>Test</span>;
// const renderPhrase = () => <span>Phrase</span>;

// const firstRow = [
//   { renderFn: renderHello, normalWidth: 1, order: 3 },
//   { renderFn: renderBye, normalWidth: 1, order: 1 },
//   { renderFn: renderFarewell, normalWidth: 1, order: 2 }
// ];

// const secondRow = [
//   { renderFn: renderNext, normalWidth: 1, order: 3 },
//   { renderFn: renderTest, normalWidth: 1, order: 1 },
//   { renderFn: renderPhrase, normalWidth: 1, order: 2 }
// ];

// const allRows = [firstRow, secondRow];

// --- Test Column Props
const testRow = [
  {
    value: "Something",
    renderComponent: renderTest,
    styles: { color: "blue" }
  },
  { value: "Another", styles: { color: "green" } },
  { value: "A Third", styles: { color: "purple" } },
  { value: "A Fourth", styles: { color: "red" } }
];

const secondRow = [
  { value: "Second Row" },
  { value: "Has additional content" },
  { value: "And much longer phrases" },
  { value: "To produce conflict" }
];
import "./Tutorials.css";

class Tutorials extends React.Component {
  render() {
    return (
      <div>
        <BasicGrid rowPropsList={[testRow, secondRow]} />

        <LazyLoad
          onContentVisible={() => console.info("Lazy Load Has Occurred")}
          height={220}
        >
          <div>
            <h1>Huuuuuge Hidden Header</h1>
            <img src="http://apod.nasa.gov/apod/image/1502/MarsPlume_jaeschke_480.gif" />
          </div>
        </LazyLoad>
      </div>
    );
  }
}

export default Tutorials;
