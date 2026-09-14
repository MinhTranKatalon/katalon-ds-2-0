import type { CSSProperties, ReactNode } from 'react';

/** A transient confirmation. It is the one place a float shadow is allowed. */
export interface ToastProps {
  tone?: 'info' | 'success' | 'warning' | 'fail';
  /** What happened, in the past tense, with the count where there is one. */
  message: ReactNode;
  /** An Undo, at most. */
  action?: ReactNode;
  onDismiss?: () => void;
  className?: string;
  style?: CSSProperties;
}
export declare function Toast(props: ToastProps): JSX.Element;
