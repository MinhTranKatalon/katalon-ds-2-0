import type { CSSProperties } from 'react';

/** A point in time, in mono. Always renders a machine-readable dateTime. */
export interface TimestampProps {
  value: string | Date;
  /** Human phrasing to show instead, e.g. "4 minutes ago". The dateTime attribute keeps the exact value. */
  relative?: string;
  className?: string;
  style?: CSSProperties;
}
export declare function Timestamp(props: TimestampProps): JSX.Element;
