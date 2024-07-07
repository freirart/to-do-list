import { ChangeEvent, useEffect, useState } from 'react';

import { ColorSelectorProps } from './interfaces';
import { HexColor } from '../../utils/interfaces';

export const useColorSelector = ({
  setNewColor,
  defaultColor
}: ColorSelectorProps) => {
  const [wasBtnClicked, setWasBtnClicked] = useState(false);
  const [updatedColor, setUpdatedColor] = useState(
    defaultColor ?? ''
  );

  const shouldShowGoDefaultBtn =
    !wasBtnClicked &&
    defaultColor &&
    updatedColor &&
    updatedColor !== defaultColor;

  const goDefault = () => {
    if (shouldShowGoDefaultBtn) {
      setWasBtnClicked(true);
      updateColor(defaultColor);
      setUpdatedColor(defaultColor);
    }
  };

  const updateColor = (hexColor: HexColor) => {
    if (wasBtnClicked) {
      setWasBtnClicked(false);
    }

    setUpdatedColor(hexColor);

    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    setNewColor(hexColor, `${r} ${g} ${b}`);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    updateColor(e.target.value as HexColor);

  useEffect(() => {
    if (defaultColor) {
      setUpdatedColor(defaultColor);
    }
  }, [defaultColor]);

  return {
    goDefault,
    shouldShowGoDefaultBtn,
    updatedColor,
    handleInputChange
  };
};
