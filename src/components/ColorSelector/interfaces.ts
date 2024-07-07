import { HexColor } from '../../utils/interfaces';

export interface ColorSelectorProps {
  setNewColor: (hexColor: HexColor, varColor: string) => void;
  defaultColor?: HexColor;
  hasReturnToDefaultBtn?: boolean;
}
