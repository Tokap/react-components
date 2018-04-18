const dropdownTest = [
  { fieldName: "Drop", path: "/drop", classList: ["yass"] },
  { fieldName: "Down", path: "/down", classList: ["nooo"] },
  { fieldName: "Thing", path: "/thing", classList: ["maybe"] }
];

const testArr = [
  {
    fieldName: "Overview",
    path: "/",
    classList: [],
    faIcon: "fa-info-circle",
    dropDownOptions: dropdownTest
  },
  { fieldName: "Website Tracking", path: "/form/page", faIcon: "fa-desktop" },
  { fieldName: "Text Editor", path: "/text_editor", faIcon: "fa-sign-in" },
  {
    fieldName: "Modal Tests",
    path: "/modal",
    faIcon: "fa-database"
  },
  { fieldName: "Login", path: "/login" },
  { fieldName: "Grid Page", path: "/grids" }
];

export default testArr;
