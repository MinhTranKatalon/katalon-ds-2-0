import type { CSSProperties, ReactNode } from 'react';

/** Lays out related buttons with a gap — never margin chains. */
export interface ButtonGroupProps {
  /** Accessible group name, e.g. "Run actions". */
  label?: string;
  /** Any --k-sp-* value. Defaults to --k-sp-3. */
  gap?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}
export declare function ButtonGroup(props: ButtonGroupProps): JSX.Element;
