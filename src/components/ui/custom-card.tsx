
import React from 'react';
import { cn } from '@/lib/utils';

interface CustomCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated' | 'outline';
  interactive?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  withHover?: boolean;
}

const CustomCard = React.forwardRef<HTMLDivElement, CustomCardProps>(
  ({ 
    className, 
    children, 
    variant = 'default', 
    interactive = false,
    padding = 'md',
    withHover = false,
    ...props 
  }, ref) => {
    const variantStyles = {
      default: 'bg-white border border-wms-200',
      glass: 'glass shadow-soft backdrop-blur-sm',
      elevated: 'bg-white shadow-elevation border border-wms-100',
      outline: 'bg-transparent border border-wms-300',
    };
    
    const paddingStyles = {
      none: 'p-0',
      sm: 'p-3',
      md: 'p-5',
      lg: 'p-7',
    };
    
    return (
      <div
        className={cn(
          'rounded-lg',
          variantStyles[variant],
          paddingStyles[padding],
          interactive && 'cursor-pointer',
          withHover && 'transition-all duration-200 hover:shadow-soft hover:translate-y-[-2px]',
          interactive && withHover && 'hover:shadow-elevation active:shadow-soft active:translate-y-0',
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CustomCard.displayName = 'CustomCard';

export { CustomCard };
