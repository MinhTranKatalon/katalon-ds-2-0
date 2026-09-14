import type { CSSProperties, ReactNode } from 'react';

export interface Command {
  id: string;
  label: string;
  icon?: ReactNode;
  /** Section label, rendered as a mono eyebrow. */
  group?: string;
  /** Key hint, e.g. "⌘R". */
  shortcut?: string;
  onRun?: () => void;
}

/** Keyboard-first access to every action in the product. */
export interface CommandPaletteProps {
  open?: boolean;
  onClose?: () => void;
  commands: Command[];
  placeholder?: string;
  className?: string;
  style?: CSSProperties;
}
export declare function CommandPalette(props: CommandPaletteProps): JSX.Element | null;
