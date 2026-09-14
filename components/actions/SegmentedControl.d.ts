import type { CSSProperties } from 'react';

export interface SegmentedOption { value: string; label: string; }

/** 2–4 mutually exclusive views. More than four options is a Select. */
export interface SegmentedControlProps {
  options: SegmentedOption[];
  value?: string;
  onChange?: (value: string) => void;
  /** Accessible name for the group. */
  label?: string;
  size?: 'sm' | 'md';
  className?: string;
  style?: CSSProperties;
}
export declare function SegmentedControl(props: SegmentedControlProps): JSX.Element;
