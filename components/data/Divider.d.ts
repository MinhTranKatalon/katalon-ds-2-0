import type { CSSProperties } from 'react';

/** A 1px rule. With a label it becomes a section break with a mono eyebrow. */
export interface DividerProps {
  vertical?: boolean;
  /** Centred mono eyebrow inside the rule. */
  label?: string;
  /** Uses --k-border-default instead of --k-border-subtle. */
  strong?: boolean;
  className?: string;
  style?: CSSProperties;
}
export declare function Divider(props: DividerProps): JSX.Element;
