import { Layout, Pane } from './Main';

export const createPanes = (layout: Layout): Pane[] => {
  const panes: Pane[] = [];

  switch (layout) {
    case Layout.Pane1:
      panes.push({
        commands: [''],
        xCoordinate: 0,
        yCoordinate: 0,
        width: 1,
        height: 1,
      });
      break;
    case Layout.Pane2V:
      panes.push({
        commands: [''],
        xCoordinate: 0,
        yCoordinate: 0,
        width: 1,
        height: 1,
      });
      panes.push({
        commands: [''],
        xCoordinate: 1,
        yCoordinate: 0,
        width: 1,
        height: 1,
      });
      break;
    case Layout.Pane2H:
      panes.push({
        commands: [''],
        xCoordinate: 0,
        yCoordinate: 0,
        width: 1,
        height: 1,
      });
      panes.push({
        commands: [''],
        xCoordinate: 0,
        yCoordinate: 1,
        width: 1,
        height: 1,
      });
      break;
    case Layout.Pane3H21:
      panes.push({
        commands: [''],
        xCoordinate: 0,
        yCoordinate: 0,
        width: 1,
        height: 1,
      });
      panes.push({
        commands: [''],
        xCoordinate: 1,
        yCoordinate: 0,
        width: 1,
        height: 1,
      });
      panes.push({
        commands: [''],
        xCoordinate: 0,
        yCoordinate: 1,
        width: 2,
        height: 1,
      });
      break;
    case Layout.Pane3H12:
      panes.push({
        commands: [''],
        xCoordinate: 0,
        yCoordinate: 0,
        width: 2,
        height: 1,
      });
      panes.push({
        commands: [''],
        xCoordinate: 0,
        yCoordinate: 1,
        width: 1,
        height: 1,
      });
      panes.push({
        commands: [''],
        xCoordinate: 1,
        yCoordinate: 1,
        width: 1,
        height: 1,
      });
      break;
    case Layout.Pane3V12:
      panes.push({
        commands: [''],
        xCoordinate: 0,
        yCoordinate: 0,
        width: 1,
        height: 2,
      });
      panes.push({
        commands: [''],
        xCoordinate: 1,
        yCoordinate: 0,
        width: 1,
        height: 1,
      });
      panes.push({
        commands: [''],
        xCoordinate: 1,
        yCoordinate: 1,
        width: 1,
        height: 1,
      });
      break;
    case Layout.Pane3V21:
      panes.push({
        commands: [''],
        xCoordinate: 0,
        yCoordinate: 0,
        width: 1,
        height: 1,
      });
      panes.push({
        commands: [''],
        xCoordinate: 1,
        yCoordinate: 0,
        width: 1,
        height: 2,
      });
      panes.push({
        commands: [''],
        xCoordinate: 0,
        yCoordinate: 1,
        width: 1,
        height: 1,
      });
      break;
    case Layout.Pane3V:
      panes.push({
        commands: [''],
        xCoordinate: 0,
        yCoordinate: 0,
        width: 1,
        height: 1,
      });
      panes.push({
        commands: [''],
        xCoordinate: 1,
        yCoordinate: 0,
        width: 1,
        height: 1,
      });
      panes.push({
        commands: [''],
        xCoordinate: 2,
        yCoordinate: 0,
        width: 1,
        height: 1,
      });
      break;
    case Layout.Pane4:
      panes.push({
        commands: [''],
        xCoordinate: 0,
        yCoordinate: 0,
        width: 1,
        height: 1,
      });
      panes.push({
        commands: [''],
        xCoordinate: 1,
        yCoordinate: 0,
        width: 1,
        height: 1,
      });
      panes.push({
        commands: [''],
        xCoordinate: 0,
        yCoordinate: 1,
        width: 1,
        height: 1,
      });
      panes.push({
        commands: [''],
        xCoordinate: 1,
        yCoordinate: 1,
        width: 1,
        height: 1,
      });
  }
  return panes;
};
