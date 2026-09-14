import type { CSSProperties } from 'react';

/** A setting that takes effect immediately. Not a form field — there is no Save. */
export interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  hint?: string;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}
export declare function Switch(props: SwitchProps): JSX.Element;
