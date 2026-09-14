import type { CSSProperties, ReactNode } from 'react';

/**
 * A persistent in-page message about the state of this view.
 * @startingPoint section="Feedback" subtitle="4 tones, with action" viewport="700x200"
 */
export interface AlertProps {
  tone?: 'info' | 'success' | 'warning' | 'fail';
  /** One line naming what happened. */
  title?: string;
  /** A Button or link that resolves it. An alert with no way out is a dead end. */
  action?: ReactNode;
  onDismiss?: () => void;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}
export declare function Alert(props: AlertProps): JSX.Element;
