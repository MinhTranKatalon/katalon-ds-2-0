import type { CSSProperties } from 'react';

/** Page control with the mono range readout. Pass total + pageSize to get "1–6 of 179". */
export interface PaginationProps {
  page?: number;
  pageCount?: number;
  onPage?: (page: number) => void;
  /** Total rows. With pageSize it renders the range readout. */
  total?: number;
  pageSize?: number;
  className?: string;
  style?: CSSProperties;
}
export declare function Pagination(props: PaginationProps): JSX.Element;
