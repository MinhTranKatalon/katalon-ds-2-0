import type { CSSProperties, ReactNode } from 'react';

/** Label + hint + error shell. Wrap every input in one. */
export interface FieldProps {
  label?: string;
  /** Persistent helper text. Shown only when there is no error. */
  hint?: string;
  /** Error text. Rendered as a role="alert" sibling — the red border is the second signal. */
  error?: string;
  required?: boolean;
  htmlFor?: string;
  /** An element, or a render function receiving { id, invalid }. */
  children?: ReactNode | ((a: { id: string; invalid: boolean }) => ReactNode);
  className?: string;
  style?: CSSProperties;
}
export declare function Field(props: FieldProps): JSX.Element;
