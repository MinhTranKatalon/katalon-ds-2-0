import type { CSSProperties } from 'react';

/** A numeric field with steppers. The value renders in JetBrains Mono. */
export interface NumberInputProps {
  value?: number | '';
  onChange?: (value: number | '') => void;
  min?: number;
  max?: number;
  step?: number;
  /** Unit label shown after the field, e.g. "minutes". */
  unit?: string;
  invalid?: boolean;
  className?: string;
  style?: CSSProperties;
}
export declare function NumberInput(props: NumberInputProps): JSX.Element;
