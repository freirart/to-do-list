import { useState } from 'react';
import { ReactFC } from '../../utils/interfaces';
import ColorSelector from '../ColorSelector';

const defaultColor = '#EA5959';

const Background: ReactFC = ({ children }) => {
  const [backgroundColor, setBackgroundColor] =
    useState(defaultColor);

  return (
    <div
      className="h-screen w-screen flex items-center justify-center transition-colors"
      style={{ backgroundColor }}
    >
      {children}
      <div className="absolute bottom-8 right-8">
        <ColorSelector
          setNewColor={setBackgroundColor}
          defaultColor={defaultColor}
        />
      </div>
    </div>
  );
};

export default Background;
