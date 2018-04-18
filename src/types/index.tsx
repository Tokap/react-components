export type MaybeDate = Date | null;

export interface FieldProps {
  topLevelState: State;
}

export interface CalendarSelection {
  to: MaybeDate;
  from: MaybeDate;
}

export interface State {
  // State Values
  currentPage?: number;
  maxPage?: number;
  userId?: number;
  name: string;
  address: string;
  phone: string;
  dateTime: CalendarSelection;

  // State Functions
  setTopLevelState: Function;
}
