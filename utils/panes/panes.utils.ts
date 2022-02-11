import { Layout } from '../../components/Main/Main';
import { Pane } from '../../components/PaneComponent/pane.interface';

export const createPanes = (layout: Layout): Pane[] => {
  const panes: Pane[] = [];

  switch (layout) {
    case Layout.Pane1:
      panes.push({
        commands: '',
        xCoordinate: 0,
        yCoordinate: 0,
        width: 1,
        height: 1,
      });
      break;
    case Layout.Pane2V:
      panes.push({
        commands: '',
        xCoordinate: 0,
        yCoordinate: 0,
        width: 1,
        height: 1,
        finalCommands: ['splitw -h'],
      });
      panes.push({
        commands: '',
        xCoordinate: 1,
        yCoordinate: 0,
        width: 1,
        height: 1,
      });
      break;
    case Layout.Pane2H:
      panes.push({
        commands: '',
        xCoordinate: 0,
        yCoordinate: 0,
        width: 1,
        height: 1,
        finalCommands: ['splitw -v'],
      });
      panes.push({
        commands: '',
        xCoordinate: 0,
        yCoordinate: 1,
        width: 1,
        height: 1,
      });
      break;
    case Layout.Pane3V:
      panes.push({
        commands: '',
        xCoordinate: 0,
        yCoordinate: 0,
        width: 1,
        height: 1,
        finalCommands: ['splitw -h'],
      });
      panes.push({
        commands: '',
        xCoordinate: 1,
        yCoordinate: 0,
        width: 1,
        height: 1,
        finalCommands: ['splitw -h'],
      });
      panes.push({
        commands: '',
        xCoordinate: 2,
        yCoordinate: 0,
        width: 1,
        height: 1,
        finalCommands: ['select-layout even-horizontal'],
      });
      break;
    case Layout.Pane3V12:
      panes.push({
        commands: '',
        xCoordinate: 0,
        yCoordinate: 0,
        width: 1,
        height: 2,
        finalCommands: ['splitw -h'],
      });
      panes.push({
        commands: '',
        xCoordinate: 1,
        yCoordinate: 0,
        width: 1,
        height: 1,
        finalCommands: ['splitw -v'],
      });
      panes.push({
        commands: '',
        xCoordinate: 1,
        yCoordinate: 1,
        width: 1,
        height: 1,
      });
      break;
    case Layout.Pane3V21:
      panes.push({
        commands: '',
        xCoordinate: 0,
        yCoordinate: 0,
        width: 1,
        height: 1,
        finalCommands: ['splitw -h'],
      });
      panes.push({
        commands: '',
        xCoordinate: 1,
        yCoordinate: 0,
        width: 1,
        height: 2,
        finalCommands: ['select-pane -t 0', 'splitw -v'],
      });
      panes.push({
        commands: '',
        xCoordinate: 0,
        yCoordinate: 1,
        width: 1,
        height: 1,
      });
      break;
    case Layout.Pane3H21:
      panes.push({
        commands: '',
        xCoordinate: 0,
        yCoordinate: 0,
        width: 1,
        height: 1,
        finalCommands: ['splitw -v'],
      });
      panes.push({
        commands: '',
        xCoordinate: 0,
        yCoordinate: 1,
        width: 2,
        height: 1,
        finalCommands: ['select-pane -t 0', 'splitw -h'],
      });
      panes.push({
        commands: '',
        xCoordinate: 1,
        yCoordinate: 0,
        width: 2,
        height: 1,
      });

      break;
    case Layout.Pane3H12:
      panes.push({
        commands: '',
        xCoordinate: 0,
        yCoordinate: 0,
        width: 2,
        height: 1,
        finalCommands: ['splitw -v'],
      });
      panes.push({
        commands: '',
        xCoordinate: 0,
        yCoordinate: 1,
        width: 1,
        height: 1,
        finalCommands: ['splitw -h'],
      });
      panes.push({
        commands: '',
        xCoordinate: 1,
        yCoordinate: 1,
        width: 1,
        height: 1,
      });
      break;
    case Layout.Pane4:
      panes.push({
        commands: '',
        xCoordinate: 0,
        yCoordinate: 0,
        width: 1,
        height: 1,
        finalCommands: ['splitw -h'],
      });
      panes.push({
        commands: '',
        xCoordinate: 1,
        yCoordinate: 0,
        width: 1,
        height: 1,
        finalCommands: ['splitw -v'],
      });
      panes.push({
        commands: '',
        xCoordinate: 1,
        yCoordinate: 1,
        width: 1,
        height: 1,
        finalCommands: ['select-pane -t 0', 'splitw -v'],
      });
      panes.push({
        commands: '',
        xCoordinate: 0,
        yCoordinate: 1,
        width: 1,
        height: 1,
      });
  }
  return panes;
};
