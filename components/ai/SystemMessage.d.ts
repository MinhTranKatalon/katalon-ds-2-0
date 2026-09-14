import type { CSSProperties, ReactNode } from 'react';

/** A quiet note in the transcript — context switched, model changed, history trimmed. */
export interface SystemMessageProps {
  /** Glyph key from the DS line set. */
  icon?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}
export declare function SystemMessage(props: SystemMessageProps): JSX.Element;
