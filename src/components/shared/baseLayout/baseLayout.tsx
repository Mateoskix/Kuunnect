import React from 'react'

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 gap-16 p-4 max-w-4xl mx-auto">
        {children}
    </div>
  )
};

export default BaseLayout;