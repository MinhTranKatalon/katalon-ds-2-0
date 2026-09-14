import type { CSSProperties, ReactNode } from 'react';

/** A two-state button. State is carried by the accent tint AND aria-pressed. */
export interface ToggleButtonProps {
  pressed?: boolean;
  onChange?: (pressed: boolean) => void;
  iconStart?: ReactNode;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}
export declare function ToggleButton(props: ToggleButtonProps): JSX.Element;
