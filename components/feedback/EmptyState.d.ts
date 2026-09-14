import type { CSSProperties, ReactNode } from 'react';

/** Teaches in one sentence and offers one action. Defaults to a 32px line icon. */
export interface EmptyStateProps {
  /** A 32px Icon. Never an illustration — the imagery style is under construction. */
  icon?: ReactNode;
  title: string;
  /** One sentence. Say what belongs here and where it comes from. */
  body?: string;
  action?: ReactNode;
  className?: string;
  style?: CSSProperties;
}
export declare function EmptyState(props: EmptyStateProps): JSX.Element;
