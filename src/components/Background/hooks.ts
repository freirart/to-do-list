import { useEffect, useState } from 'react';
import { HexColor } from '../../interfaces';

interface StoredColor {
  hexColor: HexColor;
  varColor: string;
}

export const useBackground = () => {
  const [defaultColor, setDefaultColor] = useState<
    HexColor | undefined
  >();

  const updatePrimaryColor = (newColor: string) => {
    document.documentElement.style.setProperty(
      '--color-primary',
      newColor
    );
  };

  const handleUpdatePrimaryColor = (
    hexColor: HexColor,
    varColor: string
  ) => {
    updatePrimaryColor(varColor);
    localStorage.setItem(
      'primaryColor',
      JSON.stringify({
        hexColor,
        varColor
      })
    );
  };

  useEffect(() => {
    const storedColor = localStorage.getItem('primaryColor');

    if (storedColor) {
      try {
        const { hexColor, varColor } = JSON.parse(
          storedColor
        ) as StoredColor;
        updatePrimaryColor(varColor);
        setDefaultColor(hexColor);
      } catch (err) {
        localStorage.removeItem('primaryColor');
        console.error(
          '> Não foi possível obter a cor primária salva!',
          err
        );
        setDefaultColor('#EA5959');
      }
    } else {
      setDefaultColor('#EA5959');
    }
  }, []);

  return { defaultColor, handleUpdatePrimaryColor };
};
