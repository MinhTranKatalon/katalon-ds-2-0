import React from 'react';

const VARIANT = {
  primary: 'kds-btn--primary',
  neutral: 'kds-btn--neutral',
  ink: 'kds-btn--ink',
  danger: 'kds-btn--danger',
  ghost: 'kds-btn--ghost',
};
const SIZE = { sm: 'kds-btn--sm', md: '', lg: 'kds-btn--lg' };

export function Button({
  variant = 'primary', size = 'md', as, href, iconStart, iconEnd,
  disabled, fullWidth, className = '', style, children, ...rest
}) {
  const Tag = as || (href ? 'a' : 'button');
  const cls = ['kds-btn', VARIANT[variant] || VARIANT.primary, SIZE[size] || '', className]
    .filter(Boolean).join(' ');
  return (
    <Tag
      className={cls}
      href={href}
      disabled={Tag === 'button' ? disabled : undefined}
      aria-disabled={Tag !== 'button' && disabled ? true : undefined}
      style={{ width: fullWidth ? '100%' : undefined, ...style }}
      {...rest}
    >
      {iconStart}
      {children}
      {iconEnd}
    </Tag>
  );
}
