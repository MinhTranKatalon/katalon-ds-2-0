import type { CSSProperties } from 'react';

/** A determinate bar. Always paired with its count — a bar without a number is a worse bar. */
export interface ProgressProps {
  value?: number;
  max?: number;
  label?: string;
  /** The figure, e.g. "112 of 179". Effectively required. */
  countLabel?: string;
  tone?: 'action' | 'warning' | 'fail';
  className?: string;
  style?: CSSProperties;
}
export declare function Progress(props: ProgressProps): JSX.Element;
