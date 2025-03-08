
import React from 'react';
import { cn } from "@/lib/utils";

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
    sm: 'h-20 w-20',
    md: 'h-32 w-32',
    lg: 'h-40 w-40'
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
        src="https://srv1416-files.hstgr.io/b7e820ad016831b3/files/public_html/hardiman-trans.png"
        alt="Hardimans Trädvård Logo" 
        className={cn(sizeClasses[size], "text-primary")}
        style={{ filter: 'drop-shadow(0 0 0 #fff0) drop-shadow(0 0 0 #fff0)', WebkitFilter: 'drop-shadow(0 0 0 #fff0) drop-shadow(0 0 0 #fff0)', objectFit: 'contain' }}
      />
      
      {/* Text has been removed as requested previously */}
    </div>
  );
};

export default Logo;
