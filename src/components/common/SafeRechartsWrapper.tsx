import React, { useEffect, useRef, useState, useMemo } from 'react';
import { ResponsiveContainer, ResponsiveContainerProps } from 'recharts';

interface SafeRechartsWrapperProps extends Omit<ResponsiveContainerProps, 'children'> {
  children: React.ReactElement;
  containerClassName?: string;
}

export const SafeRechartsWrapper: React.FC<SafeRechartsWrapperProps> = ({ 
  children, 
  containerClassName = "h-full w-full min-w-[200px] min-h-[150px] relative", 
  ...props 
}) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Custom debounced ResizeObserver to prevent layout loop thrashing
  useEffect(() => {
    if (!containerRef.current) return;
    
    let timeoutId: number;
    let frameId: number;
    
    const observer = new ResizeObserver((entries) => {
      // Cancel previous scheduled updates
      if (timeoutId) clearTimeout(timeoutId);
      if (frameId) cancelAnimationFrame(frameId);
      
      // Debounce and sync to next animation frame
      timeoutId = window.setTimeout(() => {
        frameId = window.requestAnimationFrame(() => {
          if (!Array.isArray(entries) || !entries.length) return;
          const entry = entries[0];
          
          let width = 0;
          let height = 0;
          
          if (entry.contentBoxSize && entry.contentBoxSize[0]) {
            width = entry.contentBoxSize[0].inlineSize;
            height = entry.contentBoxSize[0].blockSize;
          } else if (entry.contentRect) {
            width = entry.contentRect.width;
            height = entry.contentRect.height;
          }
          
          setDimensions(prev => {
            if (prev.width === width && prev.height === height) return prev;
            return { width, height };
          });
        });
      }, 50); // 50ms debounce
    });
    
    observer.observe(containerRef.current);
    
    return () => {
      observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div ref={containerRef} className={containerClassName}>
      {dimensions.width > 0 && dimensions.height > 0 && (
        <ResponsiveContainer {...props}>
          {children}
        </ResponsiveContainer>
      )}
    </div>
  );
};
