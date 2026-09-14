import type { CSSProperties, ReactNode } from 'react';

/** A short clarification on hover AND focus. Never holds information needed to act. */
export interface TooltipProps {
  /** The text. One short phrase — not a sentence of instructions. */
  label: string;
  placement?: 'top' | 'bottom';
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}
export declare function Tooltip(props: TooltipProps): JSX.Element;
