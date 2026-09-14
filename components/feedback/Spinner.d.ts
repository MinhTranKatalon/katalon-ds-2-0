import type { CSSProperties } from 'react';

/** An indeterminate wait. Honours prefers-reduced-motion via the global reset. */
export interface SpinnerProps {
  size?: number;
  /** Accessible name — say what is loading. */
  label?: string;
  className?: string;
  style?: CSSProperties;
}
export declare function Spinner(props: SpinnerProps): JSX.Element;
