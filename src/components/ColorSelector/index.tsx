import { ColorSelectorProps } from '../../interfaces';
import { useColorSelector } from './hooks';
import styles from './styles.module.less';

const ColorSelector = ({
  setNewColor,
  defaultColor
}: ColorSelectorProps) => {
  const {
    shouldShowGoDefaultBtn,
    goDefault,
    updatedColor,
    handleInputChange
  } = useColorSelector({ setNewColor, defaultColor });

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
        onChange={handleInputChange}
        value={updatedColor}
      />
    </div>
  );
};

export default ColorSelector;
