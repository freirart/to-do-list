import { FC, useState } from 'react';

import styles from './styles.module.less';

interface ColorSelectorProps {
  setNewColor: (v: string) => void;
  defaultColor?: string;
  isHex?: boolean;
}

const ColorSelector: FC<ColorSelectorProps> = ({
  setNewColor,
  defaultColor,
  isHex = true
}) => {
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

  const updateColor = (hexColor: string) => {
    if (wasBtnClicked) {
      setWasBtnClicked(false);
    }

    setUpdatedColor(hexColor);

    if (isHex) {
      setNewColor(hexColor);
    } else {
      const r = parseInt(hexColor.slice(1, 3), 16);
      const g = parseInt(hexColor.slice(3, 5), 16);
      const b = parseInt(hexColor.slice(5, 7), 16);

      setNewColor(`${r} ${g} ${b}`);
    }
  };

  return (
    <div className="flex">
      {shouldShowGoDefaultBtn ? (
        <button className="text-sm mr-1" onClick={goDefault}>
          Retornar para o padrão
        </button>
      ) : null}
      <input
        className={styles.colorInput}
        type="color"
        onChange={(e) => updateColor(e.target.value)}
        value={updatedColor}
      />
    </div>
  );
};

export default ColorSelector;
