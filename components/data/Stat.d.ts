import type { CSSProperties, ReactNode } from 'react';

/** One figure with its label. The number is the content; the label makes it legible. */
export interface StatProps {
  value: ReactNode;
  label: string;
  /** Window or source — "last 30 days", "at quarter close". */
  hint?: string;
  trend?: 'up' | 'down' | 'flat';
  /** The change itself, e.g. "+5 pts". Required whenever trend is set. */
  trendLabel?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: CSSProperties;
}
export declare function Stat(props: StatProps): JSX.Element;
