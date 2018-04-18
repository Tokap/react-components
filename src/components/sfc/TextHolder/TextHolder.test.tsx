import * as enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

enzyme.configure({ adapter: new Adapter() });

import TextHolder from "./";

// --- Support Function / Mock State
const mockState = {
  testField: "string"
};

const mockUpdateFn = (fieldName: string) => {
  mockState[fieldName] = "updated";
};

// --- Tests
it("renders correctly when foundational parameters provided", () => {
  const textHolderComponent = TextHolder({
    fieldName: "testField",
    setTopLevelState: mockUpdateFn
  });

  const textHolder = enzyme.shallow(textHolderComponent);

  expect(textHolder.find(".greeting").text()).toEqual("Hello Daniel!");
});

// TODO: Write something that actually throws or remove
it("throws when the enthusiasm level is negative", () => {
  expect(() => {
    const textHolderComponent = TextHolder({
      fieldName: "testField",
      setTopLevelState: mockUpdateFn
    });

    enzyme.shallow(textHolderComponent);
  }).toThrow();
});
