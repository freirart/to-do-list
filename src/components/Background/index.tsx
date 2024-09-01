import { ReactNode } from 'react';
import { ColorSelector } from '../ColorSelector';

import { useBackground } from './hooks';

interface BackgroundInterface {
  children: ReactNode;
}

export const Background = ({ children }: BackgroundInterface) => {
  const { handleUpdatePrimaryColor, defaultColor } = useBackground();

  return (
    <div
      className="h-screen bg-primary w-screen flex items-center justify-center
        transition-colors"
    >
      {children}
      <div className="absolute bottom-8 right-8">
        <ColorSelector
          setNewColor={handleUpdatePrimaryColor}
          defaultColor={defaultColor}
        />
      </div>
    </div>
  );
};
