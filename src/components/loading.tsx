import React, { useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    setTimeout(() => {
      onComplete();
    }, 1000);
    return;
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[-2] flex flex-col items-center justify-center bg-black text-gray-100">
      <div className="mb-4 text-xl font-bold">
        <span className="animate-blink ml-1">Loading....</span>
      </div>
      <div className="relative h-[2px] w-[200px] overflow-hidden rounded bg-gray-800">
        <div className="shdow-[0_0_15px_#3b82f6] animate-loading-bar h-full w-2/5 bg-blue-500"></div>
      </div>
    </div>
  );
};
