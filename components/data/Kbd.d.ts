import type { CSSProperties, ReactNode } from 'react';

/** One key cap. Compose several with a plain "+" between them. */
export interface KbdProps {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}
export declare function Kbd(props: KbdProps): JSX.Element;
