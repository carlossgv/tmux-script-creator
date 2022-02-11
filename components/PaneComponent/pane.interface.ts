export interface Pane {
  commands: string;
  xCoordinate: number;
  yCoordinate: number;
  width: number;
  height: number;
  finalCommands?: string[];
}
