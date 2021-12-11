import { Paper, TextField } from '@mui/material';
import { connect } from 'http2';
import React, { useEffect } from 'react';
import { FC } from 'react';
import ResultScript from '../ResultScript/ResultScript';
import WindowButtonPad from '../WindowButtonPad/WindowButtonPad';
import WindowComponent from '../WindowComponent/WindowComponent';
import styles from './Main.module.css';

type Window = {
  id: number;
  name: string;
  panes: Pane[];
};

export type Pane = {
  commands: string[];
  xCoordinate: number;
  yCoordinate: number;
};

const Main: FC = () => {
  const [sessionState, setSessionState] = React.useState({
    name: '',
    windows: [
      {
        id: 0,
        name: 'window 0',
        panes: [{ commands: [''], xCoordinate: 0, yCoordinate: 0 }],
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
    setSessionState({
      ...sessionState,
      windows: [
        ...sessionState.windows,
        {
          id: sessionState.windows.length,
          name: `window ${sessionState.windows.length}`,
          panes: [{ commands: [''], xCoordinate: 0, yCoordinate: 0 }],
        },
      ],
    });
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

  const addCommand = (event: any) => {
    const paneId = event.target.parentElement.parentElement.parentElement.id;

    const paneX = parseInt(paneId.split('_')[1]);
    const paneY = parseInt(paneId.split('_')[2]);

    setSessionState({
      ...sessionState,
      windows: sessionState.windows.map((window) => {
        if (window.id === activeWindow.id) {
          window.panes.map((pane) => {
            if (pane.xCoordinate === paneX && pane.yCoordinate === paneY) {
              pane.commands.push('');
            }
          });
          return window;
        } else {
          return window;
        }
      }),
    });
  };

  const removeCommand = (event: any) => {
    const paneId = event.target.parentElement.parentElement.parentElement.id;

    const paneX = parseInt(paneId.split('_')[1]);
    const paneY = parseInt(paneId.split('_')[2]);

    const commandId = parseInt(event.target.parentElement.id.split('_')[1]);

    setSessionState({
      ...sessionState,
      windows: sessionState.windows.map((window) => {
        if (window.id === activeWindow.id) {
          window.panes.forEach((pane) => {
            if (pane.xCoordinate === paneX && pane.yCoordinate === paneY) {
              if (pane.commands.length === 1) {
                return;
              }
              pane.commands.splice(commandId, 1);
            }
          });
          return window;
        } else {
          return window;
        }
      }),
    });
  };

  const updateCommand = (event: any) => {
    const paneId =
      event.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.id;

    const paneX = parseInt(paneId.split('_')[1]);
    const paneY = parseInt(paneId.split('_')[2]);

    const commandId = parseInt(
      event.target.parentElement.parentElement.parentElement.id.split('_')[1]
    );

    setSessionState({
      ...sessionState,
      windows: sessionState.windows.map((window) => {
        if (window.id === activeWindow.id) {
          window.panes.forEach((pane) => {
            if (pane.xCoordinate === paneX && pane.yCoordinate === paneY) {
              pane.commands[commandId] = event.target.value;
            }
          });
          return window;
        } else {
          return window;
        }
      }),
    });
  };

  const splitPane = (event: any) => {
    const paneId = event.target.parentElement.parentElement.id;

    const paneX = parseInt(paneId.split('_')[1]);
    const paneY = parseInt(paneId.split('_')[2]);

    const splitType = event.target.name;

    console.log(paneX, paneY, splitType);

    const newPaneX = splitType === 'verticalSplit' ? paneX + 1 : paneX;
    const newPaneY = splitType === 'horizontalSplit' ? paneY + 1 : paneY;

    console.log(newPaneX, newPaneY);

    setSessionState({
      ...sessionState,
      windows: sessionState.windows.map((window) => {
        if (window.id === activeWindow.id) {
          window.panes.push({
            commands: [''],
            xCoordinate: newPaneX,
            yCoordinate: newPaneY,
          });
          return window;
        } else {
          return window;
        }
      }),
    });
  };

  return (
    <Paper className={styles.main}>
      <div className={styles.mainInfo}>
        <TextField
          type="text"
          label="Session Name"
          name="name"
          onChange={handleChangeSessionName}
          required
        />
        <WindowButtonPad
          buttonsData={windowsState}
          handleClick={addNewWindow}
          handleRemoveWindow={removeWindow}
          handleRenameWindow={renameWindow}
        />
      </div>
      <div className={styles.creationContainer}>
        <WindowComponent
          panesData={activeWindow.panes}
          handleAddCommand={addCommand}
          handleRemoveCommand={removeCommand}
          handleUpdateCommand={updateCommand}
          handleSplit={splitPane}
        />
        <ResultScript session={sessionState} />
      </div>
    </Paper>
  );
};

export default Main;
