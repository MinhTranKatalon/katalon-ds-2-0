import type { CSSProperties, ReactNode } from 'react';

/** A square icon-only control. `label` is required — it is the accessible name. */
export interface IconButtonProps {
  /** Accessible name. Not optional: an icon-only control with no label is unusable. */
  label: string;
  size?: 'sm' | 'md' | 'lg';
  /** Toggled state — renders the accent tint and sets aria-pressed. */
  selected?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;
