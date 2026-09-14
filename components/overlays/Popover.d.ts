import type { CSSProperties, ReactNode } from 'react';

/** Non-blocking detail on demand — an explanation, a small form, a filter panel. */
export interface PopoverProps {
  trigger: ReactNode;
  /** Accessible name. */
  title?: string;
  align?: 'start' | 'end';
  width?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}
export declare function Popover(props: PopoverProps): JSX.Element;
