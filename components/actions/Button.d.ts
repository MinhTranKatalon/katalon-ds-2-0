import type { CSSProperties, ReactNode } from 'react';

/**
 * The primary action control. Forest green is the one primary fill.
 * @startingPoint section="Actions" subtitle="5 variants, 3 sizes" viewport="700x150"
 */
export interface ButtonProps {
  /** primary = the one CTA on the block. ghost for tertiary. ink on a coloured card. */
  variant?: 'primary' | 'neutral' | 'ink' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  /** Render as another element. Defaults to `a` when `href` is set, else `button`. */
  as?: keyof JSX.IntrinsicElements;
  href?: string;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}
export declare function Button(props: ButtonProps): JSX.Element;
