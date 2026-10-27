'use client';

import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger';
};

const variantStyles = {
  primary: 'bg-like-orange text-white hover:bg-like-orange/80',
  secondary: 'bg-like-yellow text-like-black hover:bg-like-yellow/80',
  danger: 'bg-like-red text-white hover:bg-like-red/80',
};

export function Button({
  variant,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`
        cursor-pointer rounded-md px-4 py-2 font-semibold
        transition-colors active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
        ${variant ? variantStyles[variant] : null}
        ${className}
      `}
      {...props}
    />
  );
}
