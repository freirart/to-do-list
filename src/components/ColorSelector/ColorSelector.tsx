import { FC, useRef } from 'react';

import styles from './styles.module.less';

interface ColorSelectorProps {
  setNewColor: (v: string) => void;
  defaultColor?: string;
}

const ColorSelector: FC<ColorSelectorProps> = ({
  setNewColor,
  defaultColor
}) => {
  const inputValue = useRef<HTMLInputElement>(null);

  const shouldShowGoDefaultBtn =
    defaultColor &&
    inputValue.current &&
    inputValue.current.value !== defaultColor;

  const goDefault = () => {
    if (shouldShowGoDefaultBtn) {
      setNewColor(defaultColor);
      inputValue.current.value = defaultColor;
    }
  };

  return (
    <div className="flex">
      {shouldShowGoDefaultBtn ? (
        <button
          className="text-sm underline mr-1"
          onClick={goDefault}
        >
          Retornar para o padrão
        </button>
      ) : null}
      <input
        ref={inputValue}
        className={styles.colorInput}
        type="color"
        onChange={(e) => setNewColor(e.target.value)}
        defaultValue={defaultColor}
      />
    </div>
  );
};

export default ColorSelector;
