import type { CSSProperties, ReactNode } from 'react';

/**
 * A flat surface — 1px border, 16px radius, no shadow.
 * Tiering is not optional: whenever a section holds two or more cards, assign a tier to each.
 * @startingPoint section="Data display" subtitle="Flat card, 3 importance tiers" viewport="700x220"
 */
export interface CardProps {
  /**
   * 1 = top importance (one pure 600 fill, a DIFFERENT hue on every card in the tier).
   * 2 = supporting (a step-200 tint, one hue per card).
   * 3 = the rest (bg-page / bg-subtle / bg-muted).
   */
  tier?: 1 | 2 | 3;
  /** The fill for tier 1 and 2 — pass the ramp token. Forest 600 is NEVER a card fill. */
  fill?: string;
  /** Ink measured against the fill. Derive it; never pick it by eye. */
  ink?: string;
  /** Border → primary on hover. Only when clicking anywhere in the card does something. */
  interactive?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}
export declare function Card(props: CardProps): JSX.Element;
