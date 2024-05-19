import { useState } from 'react';
import { ReactFC } from '../../utils/interfaces';
import ColorSelector from '../ColorSelector/ColorSelector';

const defaultColor = '#ef4444';

const Background: ReactFC = ({ children }) => {
  const [backgroundColor, setBackgroundColor] =
    useState(defaultColor);

  return (
    <div
      className="h-screen w-screen flex items-center justify-center"
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
