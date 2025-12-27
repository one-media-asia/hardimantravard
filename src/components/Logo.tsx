import React from 'react';
import { cn } from "@/lib/utils";
import logoImage from "@/assets/hardiman-trans.png";
type LogoProps = {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
  onClick?: () => void;
};

const Logo: React.FC<LogoProps> = ({ 
  className, 
  size = 'md', 
  withText = true,
  onClick
}) => {
  const sizeClasses = {
    sm: 'h-[136px] w-auto',
    md: 'h-[136px] w-auto',
    lg: 'h-[136px] w-auto'
  };
  
  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div className={cn(
      "flex items-center gap-2 font-serif font-semibold transition-all hover:opacity-80",
      className
    )}
    onClick={onClick}>
      <img 
        src={logoImage}
        alt="Hardimans Trädvård" 
        className={cn(sizeClasses[size], "text-primary")}
      />
      
      {/* Text has been removed as requested previously */}
    </div>
  );
};

export default Logo;
