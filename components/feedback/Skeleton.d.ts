import type { CSSProperties } from 'react';

/** A placeholder in the shape of the content that is coming. */
export interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  radius?: string;
  /** Several stacked bars; the last is short, like a real last line. */
  lines?: number;
  className?: string;
  style?: CSSProperties;
}
export declare function Skeleton(props: SkeletonProps): JSX.Element;
