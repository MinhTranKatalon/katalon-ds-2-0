import type { CSSProperties, ReactNode } from 'react';

/**
 * A blocking dialog. One decision per modal.
 * @startingPoint section="Overlays" subtitle="Dialog with scrim and footer actions" viewport="700x400"
 */
export interface ModalProps {
  open?: boolean;
  onClose?: () => void;
  /** Also the accessible name. Required. */
  title: string;
  /** For a destructive confirm, state the consequence and the count here. */
  description?: string;
  /** The action buttons. Confirm goes last. */
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}
export declare function Modal(props: ModalProps): JSX.Element | null;
