
import React from 'react';

interface SectionProps {
  id: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ id, title, children, className = "" }) => {
  return (
    <section id={id} className={`py-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto ${className}`}>
      {title && (
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-2 tracking-tight">{title}</h2>
          <div className="h-1 w-20 bg-sky-500 rounded-full"></div>
        </div>
      )}
      {children}
    </section>
  );
};

export default Section;
