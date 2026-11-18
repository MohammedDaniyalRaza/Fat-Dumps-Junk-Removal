import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import './ui.css';

export type ButtonVariant =
  | 'primary'
  | 'dark'
  | 'light'
  | 'outline-dark'
  | 'outline-light'
  | 'metal'
  | 'ghost-dark'
  | 'ghost-light';

export type ButtonSize = 'sm' | 'md' | 'lg';

function getBtnClasses(variant: ButtonVariant, size: ButtonSize, fullWidth?: boolean, className = '') {
  return [
    'fd-btn',
    `fd-btn--${variant}`,
    size !== 'md' ? `fd-btn--${size}` : '',
    fullWidth ? 'fd-btn--full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className,
  type = 'button',
  children,
  ...rest
}) => (
  <button
    type={type}
    className={getBtnClasses(variant, size, fullWidth, className)}
    {...rest}
  >
    {children}
  </button>
);

interface LinkButtonProps extends Omit<LinkProps, 'to'> {
  to?: string;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  external?: boolean;
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  to,
  href,
  variant = 'primary',
  size = 'md',
  fullWidth,
  external,
  className,
  children,
  ...rest
}) => {
  const classes = getBtnClasses(variant, size, fullWidth, className);

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={to || '/'} className={classes} {...rest}>
      {children}
    </Link>
  );
};
