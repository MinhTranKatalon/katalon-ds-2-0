import type { CSSProperties, ReactNode } from 'react';

export interface TableColumn<R = any> {
  key: string;
  header: ReactNode;
  align?: 'left' | 'right' | 'center';
  /** Renders the cell in JetBrains Mono with tabular figures. Use for every number. */
  mono?: boolean;
  render?: (row: R) => ReactNode;
}

/** A flat data table — 1px borders, tinted header, no shadow. */
export interface TableProps<R = any> {
  columns: TableColumn<R>[];
  rows: R[];
  /** Sits above the table. Say what the rows are and over what window. */
  caption?: ReactNode;
  zebra?: boolean;
  dense?: boolean;
  className?: string;
  style?: CSSProperties;
}
export declare function Table<R = any>(props: TableProps<R>): JSX.Element;
