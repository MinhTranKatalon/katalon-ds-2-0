import type { CSSProperties } from 'react';

/** A single independent choice. Several of them are not a RadioGroup. */
export interface CheckboxProps {
  checked?: boolean;
  /** Mixed state — a parent row whose children are partly selected. */
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  hint?: string;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}
export declare function Checkbox(props: CheckboxProps): JSX.Element;
