import type { CSSProperties } from 'react';

export interface Crumb { label: string; href?: string; }

/** Where this object sits. The last crumb is the current page and is not a link. */
export interface BreadcrumbsProps {
  items: Crumb[];
  className?: string;
  style?: CSSProperties;
}
export declare function Breadcrumbs(props: BreadcrumbsProps): JSX.Element;
