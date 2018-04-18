import * as React from "react";
// TODO: Review the package details and create custom type for Date. Code commented to prevent TS errors.
// import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import "./Calendar.css";

import { MaybeDate, State } from "../../../types";

export interface CalendarState {
  from: MaybeDate;
  to: MaybeDate;
  enteredTo: MaybeDate;
}

type CalendarProps = State;

// --- Helper Functions
function clone(d: Date) {
  return new Date(d.getTime());
}

function isDayBefore(d1: MaybeDate, d2: MaybeDate) {
  if (d1 == null || d2 == null) {
    return false;
  }

  const day1 = clone(d1).setHours(0, 0, 0, 0);
  const day2 = clone(d2).setHours(0, 0, 0, 0);
  return day1 < day2;
}

// --- Proper Component Functionality
export default class Example extends React.Component<
  CalendarProps,
  CalendarState
> {
  constructor(props: CalendarProps) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleDayMouseEnter = this.handleDayMouseEnter.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.renderSelectMessage = this.renderSelectMessage.bind(this);

    this.state = this.getInitialState();
  }

  getInitialState() {
    return { from: null, to: null, enteredTo: null };
  }

  isSelectingFirstDay(from: MaybeDate, to: MaybeDate, day: MaybeDate) {
    const isBeforeFirstDay = from && isDayBefore(day, from);
    const isRangeSelected = from && to;

    return !from || isBeforeFirstDay || isRangeSelected;
  }

  handleDayClick(day: Date) {
    const { from, to } = this.state;

    if (from && to && day >= from && day <= to) {
      this.handleResetClick();
      return;
    }

    if (this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        from: day as Date,
        to: null,
        enteredTo: null
      });
    } else {
      // Set Component State
      this.setState({
        to: day as Date,
        enteredTo: day as Date
      });

      // Set Top Level State
      this.props.setTopLevelState({ dateTime: { to: day, from } });
    }
  }

  handleDayMouseEnter(day: MaybeDate) {
    const { from, to } = this.state;

    if (!this.isSelectingFirstDay(from, to, day)) {
      this.setState({ enteredTo: day as Date });
    }
  }

  handleResetClick() {
    this.setState(this.getInitialState());
  }

  renderSelectMessage(): JSX.Element {
    const { to, from } = this.state;
    if (!!from && !!to) {
      // Holds all data:
      return (
        <div>
          <span>
            {`Selected from ${from.toLocaleDateString()} to ${to.toLocaleDateString()}`}
          </span>
          <br /> {/* Poor Man's Break - Move to CSS */}
          <button className="link ResetButton" onClick={this.handleResetClick}>
            Reset
          </button>
        </div>
      );
    } else if (!!this.state.from && !this.state.to) {
      // Holds start date only:
      return <span>Please select the last day.</span>;
    } else {
      // Otherwise, we have nothing:
      return <span>Please select the first day</span>;
    }
  }

  render() {
    // Existing Type Signature Expects non-nullable fields for these.
    // This has been manually adjusted in node_modules - need to do better.

    // const { from, to, enteredTo } = this.state;

    // const modifiers = { start: from, end: to };
    // const disabledDays = { before: from };
    // const selectedDays = [from, { from: from, to: enteredTo }];

    return (
      <div>
        {/* <DayPicker
          className="Range"
          numberOfMonths={2}
          fromMonth={from}
          // Package Types selectedDays & disabledDays Wrong - Must be nullable
          selectedDays={selectedDays}
          disabledDays={disabledDays}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
          onDayMouseEnter={this.handleDayMouseEnter}
        /> */}
        <div>{this.renderSelectMessage()}</div>
      </div>
    );
  }
}
