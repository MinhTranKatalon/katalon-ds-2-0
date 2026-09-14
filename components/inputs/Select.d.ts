import type { CSSProperties } from 'react';

export interface SelectOption { value: string; label: string; }

/** A native single-choice dropdown. Six or more options, or a long list. */
export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  /** Disabled first option shown when nothing is picked. */
  placeholder?: string;
  invalid?: boolean;
  size?: 'sm' | 'md';
  className?: string;
  style?: CSSProperties;
}
export declare function Select(props: SelectProps): JSX.Element;
