import { useColorSelector } from './hooks';
import { ColorSelectorProps } from './interfaces';
import styles from './styles.module.less';

export const ColorSelector = ({
  setNewColor,
  defaultColor,
  hasReturnToDefaultBtn = true
}: ColorSelectorProps) => {
  const {
    shouldShowGoDefaultBtn,
    goDefault,
    updatedColor,
    handleInputChange
  } = useColorSelector({ setNewColor, defaultColor });

  return (
    <div className="flex">
      {hasReturnToDefaultBtn && shouldShowGoDefaultBtn ? (
        <button className="text-sm mr-1" onClick={goDefault}>
          Return to default
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
