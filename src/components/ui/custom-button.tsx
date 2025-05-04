
import React from 'react';
import { cn } from '@/lib/utils';

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ 
    className, 
    children, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false,
    icon,
    iconPosition = 'left',
    ...props 
  }, ref) => {
    const variantStyles = {
      primary: 'bg-wms-accent text-white hover:bg-wms-accent-dark active:bg-wms-accent-dark focus:ring-2 focus:ring-wms-accent/40 focus:ring-offset-2',
      secondary: 'bg-wms-100 text-wms-700 hover:bg-wms-200 active:bg-wms-200 focus:ring-2 focus:ring-wms-400/30 focus:ring-offset-2',
      ghost: 'bg-transparent text-wms-700 hover:bg-wms-100 active:bg-wms-200',
      accent: 'bg-gradient-to-r from-wms-accent to-wms-accent-light text-white hover:from-wms-accent-dark hover:to-wms-accent focus:ring-2 focus:ring-wms-accent/40 focus:ring-offset-2',
      outline: 'bg-transparent border border-wms-300 text-wms-700 hover:bg-wms-50 active:bg-wms-100 focus:ring-2 focus:ring-wms-400/30 focus:ring-offset-2',
    };
    
    const sizeStyles = {
      sm: 'text-xs px-3 py-1.5 rounded',
      md: 'text-sm px-4 py-2 rounded-md',
      lg: 'text-base px-5 py-2.5 rounded-md',
    };
    
    return (
      <button
        className={cn(
          'relative inline-flex items-center justify-center font-medium shadow-sm transition-all duration-200 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          isLoading && 'opacity-90 cursor-progress',
          className
        )}
        disabled={isLoading || props.disabled}
        ref={ref}
        {...props}
      >
        {isLoading && (
          <span className="mr-2 animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" aria-hidden="true" />
        )}
        
        {icon && iconPosition === 'left' && !isLoading && (
          <span className="mr-2 flex items-center justify-center">{icon}</span>
        )}
        
        <span className="flex-1">{children}</span>
        
        {icon && iconPosition === 'right' && (
          <span className="ml-2 flex items-center justify-center">{icon}</span>
        )}
      </button>
    );
  }
);

CustomButton.displayName = 'CustomButton';

export { CustomButton };
