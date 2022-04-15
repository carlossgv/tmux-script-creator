import { Layout } from '../../components/Main/Main';
import { Pane } from '../../components/PaneComponent/pane.interface';

export type Container = {
  panes: Pane[];
  orientation: string;
};

export const createPanes = (layout: Layout): Container[] => {
  const panes: Pane[] = [];

  const containers: Container[] = [];

  switch (layout) {
    case Layout.Pane1:
      containers.push({
        orientation: 'horizontal',
        panes: [
          {
            commands: '',
            xCoordinate: 0,
            yCoordinate: 0,
            width: 1,
            height: 1,
          },
        ],
      });

      break;
    case Layout.Pane2V:
      containers.push({
        orientation: 'horizontal',
        panes: [
          {
            commands: '',
            xCoordinate: 0,
            yCoordinate: 0,
            width: 1,
            height: 1,
            finalCommands: ['splitw -h'],
          },
          {
            commands: '',
            xCoordinate: 1,
            yCoordinate: 0,
            width: 1,
            height: 1,
          },
        ],
      });
      break;
    case Layout.Pane2H:
      containers.push({
        orientation: 'vertical',
        panes: [
          {
            commands: '',
            xCoordinate: 0,
            yCoordinate: 0,
            width: 1,
            height: 1,
            finalCommands: ['splitw -v'],
          },
          {
            commands: '',
            xCoordinate: 0,
            yCoordinate: 1,
            width: 1,
            height: 1,
          },
        ],
      });

      break;
    // case Layout.Pane3V:
    //   panes.push({
    //     commands: '',
    //     xCoordinate: 0,
    //     yCoordinate: 0,
    //     width: 1,
    //     height: 1,
    //     finalCommands: ['splitw -h'],
    //   });
    //   panes.push({
    //     commands: '',
    //     xCoordinate: 1,
    //     yCoordinate: 0,
    //     width: 1,
    //     height: 1,
    //     finalCommands: ['splitw -h'],
    //   });
    //   panes.push({
    //     commands: '',
    //     xCoordinate: 2,
    //     yCoordinate: 0,
    //     width: 1,
    //     height: 1,
    //     finalCommands: ['select-layout even-horizontal'],
    //   });
    //   break;
    case Layout.Pane3V12:
      containers.push({
        orientation: 'horizontal',
        panes: [
          {
            commands: '',
            xCoordinate: 0,
            yCoordinate: 0,
            width: 1,
            height: 2,
            finalCommands: ['splitw -h'],
          },
        ],
      });
      containers.push({
        orientation: 'vertical',
        panes: [
          {
            commands: '',
            xCoordinate: 1,
            yCoordinate: 0,
            width: 1,
            height: 1,
            finalCommands: ['splitw -v'],
          },
          {
            commands: '',
            xCoordinate: 1,
            yCoordinate: 1,
            width: 1,
            height: 1,
          },
        ],
      });

      break;
    // case Layout.Pane3V21:
    //   panes.push({
    //     commands: '',
    //     xCoordinate: 0,
    //     yCoordinate: 0,
    //     width: 1,
    //     height: 1,
    //     finalCommands: ['splitw -h'],
    //   });
    //   panes.push({
    //     commands: '',
    //     xCoordinate: 1,
    //     yCoordinate: 0,
    //     width: 1,
    //     height: 2,
    //     finalCommands: ['select-pane -t 0', 'splitw -v'],
    //   });
    //   panes.push({
    //     commands: '',
    //     xCoordinate: 0,
    //     yCoordinate: 1,
    //     width: 1,
    //     height: 1,
    //   });
    //   break;
    // case Layout.Pane3H21:
    //   panes.push({
    //     commands: '',
    //     xCoordinate: 0,
    //     yCoordinate: 0,
    //     width: 1,
    //     height: 1,
    //     finalCommands: ['splitw -v'],
    //   });
    //   panes.push({
    //     commands: '',
    //     xCoordinate: 0,
    //     yCoordinate: 1,
    //     width: 2,
    //     height: 1,
    //     finalCommands: ['select-pane -t 0', 'splitw -h'],
    //   });
    //   panes.push({
    //     commands: '',
    //     xCoordinate: 1,
    //     yCoordinate: 0,
    //     width: 2,
    //     height: 1,
    //   });

    //   break;
    // case Layout.Pane3H12:
    //   panes.push({
    //     commands: '',
    //     xCoordinate: 0,
    //     yCoordinate: 0,
    //     width: 2,
    //     height: 1,
    //     finalCommands: ['splitw -v'],
    //   });
    //   panes.push({
    //     commands: '',
    //     xCoordinate: 0,
    //     yCoordinate: 1,
    //     width: 1,
    //     height: 1,
    //     finalCommands: ['splitw -h'],
    //   });
    //   panes.push({
    //     commands: '',
    //     xCoordinate: 1,
    //     yCoordinate: 1,
    //     width: 1,
    //     height: 1,
    //   });
    //   break;
    // case Layout.Pane4:
    //   panes.push({
    //     commands: '',
    //     xCoordinate: 0,
    //     yCoordinate: 0,
    //     width: 1,
    //     height: 1,
    //     finalCommands: ['splitw -h'],
    //   });
    //   panes.push({
    //     commands: '',
    //     xCoordinate: 1,
    //     yCoordinate: 0,
    //     width: 1,
    //     height: 1,
    //     finalCommands: ['splitw -v'],
    //   });
    //   panes.push({
    //     commands: '',
    //     xCoordinate: 1,
    //     yCoordinate: 1,
    //     width: 1,
    //     height: 1,
    //     finalCommands: ['select-pane -t 0', 'splitw -v'],
    //   });
    //   panes.push({
    //     commands: '',
    //     xCoordinate: 0,
    //     yCoordinate: 1,
    //     width: 1,
    //     height: 1,
    //   });
  }
  return containers;
};
