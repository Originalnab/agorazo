import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed select-none';

  const variantStyles = {
    primary: 'bg-agorazo-orange-500 hover:bg-agorazo-orange-600 text-white shadow-sm hover:shadow-orange-glow focus:ring-agorazo-orange-500',
    secondary: 'bg-agorazo-charcoal-900 hover:bg-agorazo-charcoal-800 text-white focus:ring-agorazo-charcoal-700',
    outline: 'border border-agorazo-charcoal-200 bg-white text-agorazo-charcoal-800 hover:bg-slate-50 hover:border-agorazo-charcoal-300 focus:ring-agorazo-orange-500',
    ghost: 'text-agorazo-charcoal-700 hover:bg-slate-100 hover:text-agorazo-charcoal-900 focus:ring-agorazo-charcoal-400',
    destructive: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
  };

  const sizeStyles = {
    sm: 'h-9 px-3 text-xs gap-1.5',
    md: 'h-11 px-4 text-sm gap-2',
    lg: 'h-13 px-6 text-base gap-2.5 font-semibold',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
