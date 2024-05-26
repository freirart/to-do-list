import { ChangeEvent, FC, useRef, useState } from 'react';

import styles from './styles.module.less';

interface ColorSelectorProps {
  setNewColor: (v: string) => void;
  defaultColor?: string;
}

const ColorSelector: FC<ColorSelectorProps> = ({
  setNewColor,
  defaultColor
}) => {
  const [wasBtnClicked, setWasBtnClicked] = useState(false);
  const inputValue = useRef<HTMLInputElement>(null);

  const shouldShowGoDefaultBtn =
    !wasBtnClicked &&
    defaultColor &&
    inputValue.current &&
    inputValue.current.value !== defaultColor;

  const goDefault = () => {
    if (shouldShowGoDefaultBtn) {
      setWasBtnClicked(true);
      setNewColor(defaultColor);
      inputValue.current.value = defaultColor;
    }
  };

  const updateColor = (e: ChangeEvent<HTMLInputElement>) => {
    if (wasBtnClicked) {
      setWasBtnClicked(false);
    }

    setNewColor(e.target.value);
  };

  return (
    <div className="flex">
      {shouldShowGoDefaultBtn ? (
        <button className="text-sm mr-1" onClick={goDefault}>
          Retornar para o padrão
        </button>
      ) : null}
      <input
        ref={inputValue}
        className={styles.colorInput}
        type="color"
        onChange={updateColor}
        defaultValue={defaultColor}
      />
    </div>
  );
};

export default ColorSelector;
