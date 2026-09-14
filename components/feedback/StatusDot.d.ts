import type { CSSProperties, ReactNode } from 'react';

/** A dot plus its word. The label is not optional — the dot alone is colour-only. */
export interface StatusDotProps {
  tone?: 'pass' | 'fail' | 'warning' | 'pending' | 'neutral' | 'running';
  /** The status word. Required. */
  label: ReactNode;
  size?: number;
  className?: string;
  style?: CSSProperties;
}
export declare function StatusDot(props: StatusDotProps): JSX.Element;
