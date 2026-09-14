import type { CSSProperties } from 'react';

export interface TabItem { value: string; label: string; count?: number; }

/**
 * Switches between sibling views of one object.
 * @startingPoint section="Navigation" subtitle="Underline tabs with counts" viewport="700x120"
 */
export interface TabsProps {
  tabs: TabItem[];
  value?: string;
  onChange?: (value: string) => void;
  /** Accessible name for the tab list. */
  label?: string;
  className?: string;
  style?: CSSProperties;
}
export declare function Tabs(props: TabsProps): JSX.Element;
