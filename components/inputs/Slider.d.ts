import type { CSSProperties } from 'react';

/** A value on a continuous range. Pair it with the readout — a slider alone hides the number. */
export interface SliderProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  label?: string;
  unit?: string;
  /** Mono readout beside the label. On by default; a slider without it is a worse slider. */
  showValue?: boolean;
  className?: string;
  style?: CSSProperties;
}
export declare function Slider(props: SliderProps): JSX.Element;
