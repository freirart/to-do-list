export type HexColor = `#${string}`;

export interface ColorSelectorProps {
  setNewColor: (hexColor: HexColor, varColor: string) => void;
  defaultColor?: HexColor;
}
