import type { CSSProperties } from 'react';

/** A native date / time / datetime input — it maps 1:1 to the platform picker. */
export interface DateTimeFieldProps {
  type?: 'date' | 'time' | 'datetime-local';
  value?: string;
  onChange?: (value: string) => void;
  invalid?: boolean;
  min?: string;
  max?: string;
  className?: string;
  style?: CSSProperties;
}
export declare function DateTimeField(props: DateTimeFieldProps): JSX.Element;
