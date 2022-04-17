import { Layout } from '../../components/Main/Main';
import { Pane } from '../../components/PaneComponent/pane.interface';

export type LayoutContainer = {
  panes: (Pane | LayoutContainer)[];
  orientation: 'row' | 'column';
};

export const createPanes = (layout: Layout): LayoutContainer => {
  let containers: LayoutContainer = {
    panes: [],
    orientation: 'row',
  };

  switch (layout) {
    case Layout.Pane1:
      containers = {
        orientation: 'row',
        panes: [
          {
            commands: '',
            xCoordinate: 0,
            yCoordinate: 0,
            width: 1,
            height: 1,
          },
        ],
      };

      break;
    case Layout.Pane2V:
      containers = {
        orientation: 'row',
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
      };
      break;
    case Layout.Pane2H:
      containers = {
        orientation: 'column',
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
      };

      break;
    case Layout.Pane3V:
      containers = {
        orientation: 'row',
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
            finalCommands: ['splitw -h'],
          },
          {
            commands: '',
            xCoordinate: 2,
            yCoordinate: 0,
            width: 1,
            height: 1,
          },
        ],
      };
      break;
    case Layout.Pane3V12:
      containers = {
        orientation: 'row',
        panes: [
          {
            commands: '',
            xCoordinate: 0,
            yCoordinate: 0,
            width: 1,
            height: 2,
            finalCommands: ['splitw -h'],
          },
          {
            orientation: 'column',
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
          },
        ],
      };

      break;
    case Layout.Pane3V21:
      containers = {
        orientation: 'row',
        panes: [
          {
            orientation: 'column',
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
                height: 2,
                finalCommands: ['select-pane -t 0', 'splitw -v'],
              },
            ],
          },
          {
            commands: '',
            xCoordinate: 0,
            yCoordinate: 1,
            width: 1,
            height: 1,
          },
        ],
      };

      break;
    case Layout.Pane3H21:
      containers = {
        orientation: 'column',
        panes: [
          {
            orientation: 'row',
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
                width: 2,
                height: 1,
                finalCommands: ['select-pane -t 0', 'splitw -h'],
              },
            ],
          },
          {
            commands: '',
            xCoordinate: 1,
            yCoordinate: 0,
            width: 2,
            height: 1,
          },
        ],
      };

      break;
    case Layout.Pane3H12:
      containers = {
        orientation: 'column',
        panes: [
          {
            commands: '',
            xCoordinate: 0,
            yCoordinate: 0,
            width: 2,
            height: 1,
            finalCommands: ['splitw -v'],
          },
          {
            orientation: 'row',
            panes: [
              {
                commands: '',
                xCoordinate: 0,
                yCoordinate: 1,
                width: 1,
                height: 1,
                finalCommands: ['splitw -h'],
              },
              {
                commands: '',
                xCoordinate: 1,
                yCoordinate: 1,
                width: 1,
                height: 1,
              },
            ],
          },
        ],
      };
      break;
    case Layout.Pane4:
      containers = {
        orientation: 'row',
        panes: [
          {
            orientation: 'column',
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
                finalCommands: ['splitw -v'],
              },
            ],
          },
          {
            orientation: 'column',
            panes: [
              {
                commands: '',
                xCoordinate: 1,
                yCoordinate: 1,
                width: 1,
                height: 1,
                finalCommands: ['splitw -h'],
              },
              {
                commands: '',
                xCoordinate: 0,
                yCoordinate: 1,
                width: 1,
                height: 1,
                finalCommands: ['splitw -v'],
              },
            ],
          },
        ],
      };
      break;
  }
  return containers;
};
