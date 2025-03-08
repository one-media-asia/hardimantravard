
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
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-14 w-14'
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
        viewBox="0 0 500 500" 
        className={cn(sizeClasses[size], "text-primary")}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer circle */}
        <circle 
          cx="250" 
          cy="250" 
          r="240" 
          fill="white" 
          stroke="#CCCCCC"
          strokeWidth="10"
        />
        
        {/* Inner circle */}
        <circle 
          cx="250" 
          cy="250" 
          r="200" 
          fill="white" 
          stroke="#CCCCCC"
          strokeWidth="6"
        />
        
        {/* Tree silhouette */}
        <path 
          d="M250 350 L250 420 M150 350 C170 300 200 280 230 260 C270 230 280 190 280 150 C300 160 320 190 330 220 C350 270 320 310 300 330 C260 370 180 370 150 350 Z" 
          fill="#CCCCCC"
          stroke="#CCCCCC"
          strokeWidth="5"
        />
        
        {/* Top text arc */}
        <path id="topArc" d="M80 180 A 180 180 0 0 1 420 180" fill="none" />
        <text>
          <textPath href="#topArc" startOffset="50%" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold" fontSize="38" fill="#F97316">
            HARDIMANS TRÄDVÅRD
          </textPath>
        </text>
        
        {/* Bottom text arc */}
        <path id="bottomArc" d="M420 320 A 180 180 0 0 1 80 320" fill="none" />
        <text>
          <textPath href="#bottomArc" startOffset="50%" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold" fontSize="38" fill="#F97316">
            ARBORISTER I VÄST
          </textPath>
        </text>
        
        {/* Brush strokes */}
        <path 
          d="M30 250 A 240 240 0 0 1 470 250" 
          fill="none" 
          stroke="#CCCCCC"
          strokeWidth="8"
          strokeDasharray="4 8 12"
          strokeLinecap="round"
        />
        <path 
          d="M470 250 A 240 240 0 0 1 30 250" 
          fill="none" 
          stroke="#CCCCCC"
          strokeWidth="8"
          strokeDasharray="4 8 12"
          strokeLinecap="round"
        />
      </svg>
      
      {withText && (
        <span className={cn(textSizeClasses[size], "text-[#F97316]")}>
          Hardimans Trädvård
        </span>
      )}
    </div>
  );
};

export default Logo;
