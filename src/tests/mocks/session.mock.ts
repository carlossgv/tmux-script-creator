import { Layout, Session } from '../../components/Main/Main';

const sessionMock: Session = {
  name: 'Test',
  windows: [],
};

const sessionMockBuilder = (amountWindows: number) => {
  for (let i = 0; i < amountWindows; i++) {
    sessionMock.windows.push({
      id: i,
      name: `Window ${i}`,
      panes: [
        {
          commands: `command in pane of window ${i}`,
          xCoordinate: 0,
          yCoordinate: 0,
          width: 1,
          height: 1,
        },
      ],
      layout: Layout.Pane1,
    });
  }

  return sessionMock;
};

export { sessionMockBuilder };
