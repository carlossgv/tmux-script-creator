import { MenuItem, Paper, Select, TextField } from '@mui/material';
import { connect } from 'http2';
import React, { useEffect } from 'react';
import { FC } from 'react';
import ResultScript from '../ResultScript/ResultScript';
import WindowButtonPad from '../WindowButtonPad/WindowButtonPad';
import WindowComponent from '../WindowComponent/WindowComponent';
import styles from './Main.module.css';
import { createPanes } from './panesUtils';

export type Window = {
  id: number;
  name: string;
  panes: Pane[];
  layout: Layout;
};

export enum Layout {
  Pane1 = 'One Panel',
  Pane2V = 'Two Panes Vertical',
  Pane2H = 'Two Panes Horizontal',
  Pane3V = 'Three Panes Vertical',
  Pane3V12 = 'Three Panes V: 1-2',
  Pane3V21 = 'Three Panes V: 2-1',
  Pane3H12 = 'Three Panes H: 1-2',
  Pane3H21 = 'Three Panes H: 2-1',
  Pane4 = 'Four Panes',
}

export type Pane = {
  commands: string;
  xCoordinate: number;
  yCoordinate: number;
  width: number;
  height: number;
  finalCommands?: string[];
};

export type Session = {
  name: string;
  windows: Window[];
};

const Main: FC = () => {
  const [sessionState, setSessionState] = React.useState({
    name: '',
    windows: [
      {
        id: 0,
        name: 'window 0',
        panes: [
          {
            commands: '',
            xCoordinate: 0,
            yCoordinate: 0,
            width: 1,
            height: 1,
          },
        ],
        layout: Layout.Pane1,
      },
    ],
  });

  const [windowsState, setWindowsState] = React.useState<string[]>(
    sessionState.windows.map((window) => window.name)
  );

  const [activeWindow, setActiveWindow] = React.useState<Window>(
    sessionState.windows[0]
  );

  useEffect(() => {
    setWindowsState(sessionState.windows.map((window) => window.name));
  }, [sessionState.windows]);

  const handleChangeSessionName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSessionState({
      ...sessionState,
      [event.target.name]: event.target.value,
    });
  };

  const addNewWindow = () => {
    const newWindow: Window = {
      id: sessionState.windows.length,
      name: `window ${sessionState.windows.length}`,
      panes: [
        {
          commands: '',
          xCoordinate: 0,
          yCoordinate: 0,
          width: 1,
          height: 1,
        },
      ],
      layout: Layout.Pane1,
    };

    sessionState.windows.forEach((window, index) => (window.id = index));

    setSessionState({
      ...sessionState,
      windows: [...sessionState.windows, newWindow],
    });

    setActiveWindow(newWindow);
  };

  const removeWindow = (event: any) => {
    const index = parseInt(event.target.parentElement.id.split('_')[2]);

    if (sessionState.windows.length === 1) {
      return;
    }

    setSessionState({
      ...sessionState,
      windows: sessionState.windows.filter((_window, i) => i !== index),
    });
  };

  const renameWindow = (event: any) => {
    const index = parseInt(
      event.target.parentElement.parentElement.parentElement.id.split('_')[2]
    );

    setSessionState({
      ...sessionState,
      windows: sessionState.windows.map((window, i) =>
        i === index ? { ...window, name: event.target.value } : window
      ),
    });

    setActiveWindow(sessionState.windows[index]);
  };

  const updateCommands = (event: any) => {
    const paneId = event.target.id;
    const paneX = parseInt(paneId.split('_')[1]);
    const paneY = parseInt(paneId.split('_')[2]);

    setSessionState({
      ...sessionState,
      windows: sessionState.windows.map((window) => {
        if (window.id === activeWindow.id) {
          window.panes.forEach((pane) => {
            if (pane.xCoordinate === paneX && pane.yCoordinate === paneY) {
              pane.commands = event.target.value;
            }
          });
          return window;
        } else {
          return window;
        }
      }),
    });
  };

  const updateLayout = (event: any) => {
    const newWindows: Window[] = sessionState.windows.map((window) => {
      if (window.id === activeWindow.id) {
        window.layout = event.target.value;

        const panes = createPanes(window.layout);

        window.panes = panes;

        setActiveWindow(window);

        return window;
      } else {
        return window;
      }
    });

    setSessionState({
      ...sessionState,
      windows: newWindows,
    });
  };

  return (
    <Paper className={styles.main}>
      <div className={styles.mainInfo}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            type="text"
            label="Session Name"
            name="name"
            onChange={handleChangeSessionName}
            required
            size="small"
          />
          <Select
            onChange={updateLayout}
            value={activeWindow.layout}
            size="small"
          >
            {Object.values(Layout).map((l) => {
              return (
                <MenuItem key={l} value={l}>
                  {l}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <WindowButtonPad
          buttonsData={sessionState.windows}
          handleClick={addNewWindow}
          handleRemoveWindow={removeWindow}
          handleRenameWindow={renameWindow}
          activeWindow={activeWindow.id}
        />
      </div>
      <div className={styles.creationContainer}>
        <WindowComponent
          panesData={activeWindow.panes}
          handleUpdateCommands={updateCommands}
          layout={activeWindow.layout}
        />
        <ResultScript session={sessionState} />
      </div>
    </Paper>
  );
};

export default Main;
