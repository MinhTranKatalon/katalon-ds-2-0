import type { CSSProperties, ReactNode } from 'react';

/** A side panel for detail or a long form, without leaving the list behind it. */
export interface DrawerProps {
  open?: boolean;
  onClose?: () => void;
  /** Also the accessible name. */
  title: string;
  side?: 'left' | 'right';
  width?: number;
  footer?: ReactNode;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}
export declare function Drawer(props: DrawerProps): JSX.Element | null;
