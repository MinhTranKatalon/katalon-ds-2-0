import type { CSSProperties, ReactNode } from 'react';

export interface TreeNode {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  /** Mono right-aligned detail — a count, a duration. */
  meta?: ReactNode;
  children?: TreeNode[];
}

/** A nested hierarchy. 36px rows, 16px indent per level. */
export interface TreeListProps {
  nodes: TreeNode[];
  defaultOpen?: string[];
  /** Accessible name for the tree. */
  label?: string;
  className?: string;
  style?: CSSProperties;
}
export declare function TreeList(props: TreeListProps): JSX.Element;
