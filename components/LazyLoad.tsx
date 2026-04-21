import React, { useState, useEffect, useRef, ReactNode } from 'react';

interface LazyLoadProps {
  children: ReactNode;
  height?: string | number;
  offset?: string;
  className?: string;
}

export const LazyLoad: React.FC<LazyLoadProps> = ({ 
  children, 
  height = '200px', 
  offset = '100px',
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { rootMargin: offset }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.disconnect();
    };
  }, [offset]);

  return (
    <div ref={ref} className={className} style={{ minHeight: !isVisible ? height : undefined }}>
      {isVisible ? children : null}
    </div>
  );
};