import { ReactFC } from '../../utils/interfaces';
import ColorSelector from '../ColorSelector';

const defaultColor = '#EA5959';

const Background: ReactFC = ({ children }) => {
  const updatePrimaryColor = (newColor: string) => {
    document.documentElement.style.setProperty(
      '--color-primary',
      newColor
    );
  };

  return (
    <div
      className="h-screen bg-primary w-screen flex items-center justify-center
        transition-colors"
    >
      {children}
      <div className="absolute bottom-8 right-8">
        <ColorSelector
          setNewColor={updatePrimaryColor}
          defaultColor={defaultColor}
          isHex={false}
        />
      </div>
    </div>
  );
};

export default Background;
