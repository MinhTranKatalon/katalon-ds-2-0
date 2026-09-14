import type { CSSProperties } from 'react';

/**
 * The Katalon logo plus a product or resource name, as one locked lockup.
 * @startingPoint section="Brand" subtitle="Logo + product name, one parameter" viewport="700x140"
 */
export interface SubLockupProps {
  /** The product or resource name, e.g. "Studio", "TestOps", "Academy". */
  name: string;
  /** product = Forest Green name. resource = the resource ink. */
  kind?: 'product' | 'resource';
  /** Logo height in px. Everything else — size, gap, baseline, weight, tracking — is a ratio of it. */
  height?: number;
  /** Swaps to the white/green logo and the dark-ground name colour. */
  dark?: boolean;
  /** Override the logo file. Use a file from assets/logos/ — never re-type "Katalon". */
  logoSrc?: string;
  className?: string;
  style?: CSSProperties;
}
export declare function SubLockup(props: SubLockupProps): JSX.Element;
