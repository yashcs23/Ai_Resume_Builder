import React from 'react';

const LayoutContainer = ({ children, className = '' }) => {
  return (
    <div className={`max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 w-full ${className}`}>
      {children}
    </div>
  );
};

export default LayoutContainer;
