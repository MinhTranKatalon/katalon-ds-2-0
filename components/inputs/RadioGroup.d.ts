import type { CSSProperties } from 'react';

export interface RadioOption { value: string; label: string; hint?: string; }

/** One of many, all options visible. Six or more → Select. */
export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  /** Accessible group name. */
  label?: string;
  className?: string;
  style?: CSSProperties;
}
export declare function RadioGroup(props: RadioGroupProps): JSX.Element;
