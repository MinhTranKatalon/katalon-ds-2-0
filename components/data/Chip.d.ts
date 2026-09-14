import type { CSSProperties, ReactNode } from 'react';

/** An applied filter, or a selectable token. Removable when onRemove is given. */
export interface ChipProps {
  onRemove?: () => void;
  selected?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}
export declare function Chip(props: ChipProps): JSX.Element;
