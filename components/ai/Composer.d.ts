import type { CSSProperties, ReactNode } from 'react';

/** The input for a Katalon AI conversation. Enter sends, Shift+Enter breaks the line. */
export interface ComposerProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  /** Disables send while the assistant is working. */
  busy?: boolean;
  /** One line under the field — what it can do, or what it cannot see. */
  hint?: string;
  /** Extra controls inside the field, e.g. an attach button. */
  actions?: ReactNode;
  className?: string;
  style?: CSSProperties;
}
export declare function Composer(props: ComposerProps): JSX.Element;
