// NOTE: This file really isn't doing anything. These changes had to be
// made at the package level to propagate. Come up with a better method
// of overriding poorly written TS files. The maintainer of this repo quite
// literally said "IDK" regarding the TS bindings - community made.

// React's ecosystem is heavily driven by support packages so common-use,
// but complex components can be shared and battle tested in libs.
// We will need a standard way to correct and overwrite bad type signatures.

// This package failed with respect to possible nullability. The component example
// provided by the author relies on a state that can be null, but the provided
// TS bindings suggest all of these to be definite. This could also be a reflection
// of my linter using strict non-nullability. HOWEVER, our bindings should be consistent
// and if some packages suggest nullability and others don't, we're definitely losing
// some of the benefits of TypeScript.

// References in source materials:
// https://github.com/gpbl/react-day-picker/blob/master/src/DateUtils.js
// https://github.com/gpbl/react-day-picker/blob/master/types/props.d.ts
// https://github.com/gpbl/react-day-picker/blob/master/types/common.d.ts
// https://github.com/gpbl/react-day-picker/tree/master/types
// https://stackoverflow.com/questions/41627631/exclude-overwrite-npm-provided-typings
// https://stackoverflow.com/questions/40322788/how-to-overwrite-incorrect-typescript-\
// type-definition-installed-via-types-packa

// type MaybeDate = Date | null;

// export interface RangeModifier {
//   from: MaybeDate;
//   to: MaybeDate;
// }
// export interface BeforeModifier {
//   before: MaybeDate;
// }
// export interface AfterModifier {
//   after: MaybeDate;
// }
// export interface BeforeAfterModifier {
//   after: MaybeDate;
//   before: MaybeDate;
// }
// export interface DaysOfWeekModifier {
//   daysOfWeek: number[];
// }
// export type FunctionModifier = (date: Date) => boolean;
// export type Modifier =
//   | null
//   | Date
//   | RangeModifier
//   | BeforeModifier
//   | AfterModifier
//   | BeforeAfterModifier
//   | DaysOfWeekModifier
//   | FunctionModifier;

// declare module "react-day-picker" {
//   interface DayPickerProps {
//     selectedDays?: Modifier | Modifier[];
//   }
// }

// // Also, in props.d.ts:
// export interface DayPickerProps {
//   // ...
//   fromMonth?: Date | null;
//   // ...
// }
