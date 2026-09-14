import type { CSSProperties, SVGProps } from 'react';

/**
 * A line icon from the Katalon DS set.
 * @startingPoint section="Icons" subtitle="209-glyph line set, stroke 1.4" viewport="700x150"
 */
export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'style' | 'name'> {
  /** Glyph key from ICON_NAMES, e.g. "circle-check". */
  name: string;
  /** Rendered box in px. Use 16 / 20 / 24 / 32 — never an off-scale size. */
  size?: 16 | 20 | 24 | 32 | number;
  /** Accessible name. Required when the icon is the only content of a control. */
  label?: string;
  style?: CSSProperties;
}
export declare function Icon(props: IconProps): JSX.Element | null;
