import type { CSSProperties, ReactNode } from 'react';

/** A flat row of icon buttons and toggles above a table, editor or canvas. */
export interface ToolbarProps {
  /** Accessible name, e.g. "Editor actions". */
  label?: string;
  /** 40px row for a dense product surface. Default 52px. */
  dense?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}
export declare function Toolbar(props: ToolbarProps): JSX.Element;
export declare function ToolbarSeparator(): JSX.Element;
export declare function ToolbarSpacer(): JSX.Element;
