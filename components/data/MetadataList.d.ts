import type { CSSProperties, ReactNode } from 'react';

export interface MetadataItem {
  label: string;
  value: ReactNode;
  /** Mono value. Use for ids, paths, durations, timestamps, counts. */
  mono?: boolean;
}

/** Label/value pairs describing one object. Labels are mono eyebrows. */
export interface MetadataListProps {
  items: MetadataItem[];
  columns?: 1 | 2 | 3 | 4;
  className?: string;
  style?: CSSProperties;
}
export declare function MetadataList(props: MetadataListProps): JSX.Element;
