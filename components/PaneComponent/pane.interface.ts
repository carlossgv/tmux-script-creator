export interface Pane {
  commands: string;
  xCoordinate: number;
  yCoordinate: number;
  width: number;
  height: number;
  widthPercentage?: number | null;
  heightPercentage?: number | null;
  finalCommands?: string[];
}
