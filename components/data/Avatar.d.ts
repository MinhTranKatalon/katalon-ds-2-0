import type { CSSProperties } from 'react';

/** A person. Falls back to initials on the action tint — never to a generic silhouette. */
export interface AvatarProps {
  /** Full name. Used for initials and as the accessible name. */
  name?: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg' | number;
  className?: string;
  style?: CSSProperties;
}
export declare function Avatar(props: AvatarProps): JSX.Element;
