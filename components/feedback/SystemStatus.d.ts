import type { CSSProperties, ReactNode } from 'react';

/** A whole-page state: maintenance, outage, 404, server error. */
export interface SystemStatusProps {
  kind?: 'maintenance' | 'outage' | 'notFound' | 'error';
  /** Overrides the default title for that kind. */
  title?: string;
  /** What happened and what to do, in one or two sentences. */
  body?: string;
  /** Correlation id or error code, rendered in mono for a support ticket. */
  detail?: string;
  action?: ReactNode;
  className?: string;
  style?: CSSProperties;
}
export declare function SystemStatus(props: SystemStatusProps): JSX.Element;
