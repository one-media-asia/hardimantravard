
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
    sm: 'h-6 w-6',
    md: 'h-7 w-7',
    lg: 'h-10 w-10'
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
      <svg 
        viewBox="0 0 100 100" 
        className={cn(sizeClasses[size], "text-primary")}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Tree Shape */}
        <path 
          d="M50 10 L65 40 L80 65 L65 65 L65 90 L35 90 L35 65 L20 65 L35 40 Z" 
          fill="#F97316" // Orange
          stroke="#4B7F52" // Green outline
          strokeWidth="3" 
        />
        
        {/* Leaf elements */}
        <circle cx="40" cy="25" r="5" fill="#4B7F52" /> {/* Left leaf */}
        <circle cx="60" cy="25" r="5" fill="#4B7F52" /> {/* Right leaf */}
        <circle cx="50" cy="20" r="6" fill="#4B7F52" /> {/* Top leaf */}
        
        {/* White highlights */}
        <path 
          d="M46 35 Q50 25 54 35" 
          fill="none" 
          stroke="#FFFFFF" 
          strokeWidth="2"
        />
        <path 
          d="M40 50 Q50 40 60 50" 
          fill="none" 
          stroke="#FFFFFF" 
          strokeWidth="2"
        />
      </svg>
      
      {withText && (
        <span className={cn(textSizeClasses[size])}>
          Hardiman Trädvård
        </span>
      )}
    </div>
  );
};

export default Logo;
