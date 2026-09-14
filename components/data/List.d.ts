import type { CSSProperties, ReactNode } from 'react';

export interface ListItem {
  id?: string | number;
  title: ReactNode;
  /** Secondary line — a path, an owner, a timestamp. */
  meta?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
}

/** A vertical list of records separated by hairlines. */
export interface ListProps {
  items: ListItem[];
  divided?: boolean;
  className?: string;
  style?: CSSProperties;
}
export declare function List(props: ListProps): JSX.Element;
