import React from 'react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center font-sans antialiased selection:bg-emerald-200 selection:text-emerald-900">
      {/* Standard Mobile Container */}
      <div className="w-full sm:max-w-[420px] h-screen bg-white sm:border-x border-gray-200 shadow-2xl flex flex-col overflow-hidden relative rounded-none">
        <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col relative">
          {children}
        </div>
      </div>
    </div>
  );
};

