import type { CSSProperties, InputHTMLAttributes, ReactNode } from 'react';

/**
 * A single-line text input.
 * @startingPoint section="Inputs" subtitle="Text, search, invalid, disabled" viewport="700x180"
 */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'style'> {
  /** Sets aria-invalid and the fail border. Always pair with Field's `error`. */
  invalid?: boolean;
  /** Leading icon, e.g. a magnifying glass on a search field. */
  iconStart?: ReactNode;
  size?: 'sm' | 'md';
  className?: string;
  style?: CSSProperties;
}
export declare function Input(props: InputProps): JSX.Element;
