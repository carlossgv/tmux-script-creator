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
  width: number;
  height: number;
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
            commands: [''],
            xCoordinate: 0,
            yCoordinate: 0,
            width: 1,
            height: 1,
          },
        ],
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
          panes: [
            {
              commands: [''],
              xCoordinate: 0,
              yCoordinate: 0,
              width: 1,
              height: 1,
            },
          ],
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

    const newPaneX = splitType === 'verticalSplit' ? paneX + 1 : paneX;
    const newPaneY = splitType === 'horizontalSplit' ? paneY + 1 : paneY;

    // Mover los paneles si ya existe el nuevo
    setSessionState({
      ...sessionState,
      windows: sessionState.windows.map((window) => {
        if (window.id === activeWindow.id) {
          if (
            window.panes.find(
              (pane) =>
                pane.xCoordinate === newPaneX && pane.yCoordinate === newPaneY
            )
          ) {
            if (splitType === 'verticalSplit') {
              window.panes.forEach((pane) => {
                if (pane.xCoordinate > paneX) {
                  pane.xCoordinate += 1;
                }
              });
            } else if (splitType === 'horizontalSplit') {
              window.panes.forEach((pane) => {
                if (pane.yCoordinate > paneY) {
                  pane.yCoordinate += 1;
                }
              });
            }
          }
          return window;
        } else {
          return window;
        }
      }),
    });

    // create new panel
    setSessionState({
      ...sessionState,
      windows: sessionState.windows.map((window) => {
        if (window.id === activeWindow.id) {
          window.panes.push({
            commands: [''],
            xCoordinate: newPaneX,
            yCoordinate: newPaneY,
            width: 1,
            height: 1,
          });
          return window;
        } else {
          return window;
        }
      }),
    });

    // change width and heigh of remainder panes
    // TODO: proper split implementation in extreme cases
    setSessionState({
      ...sessionState,
      windows: sessionState.windows.map((window) => {
        if (window.id === activeWindow.id) {
          window.panes.forEach((pane) => {
            if (
              (pane.xCoordinate !== paneX && pane.yCoordinate !== paneY) ||
              (pane.xCoordinate !== newPaneX && pane.yCoordinate !== newPaneY)
            ) {
              pane.height =
                splitType === 'verticalSplit' ? pane.height : pane.height * 2;
              pane.width =
                splitType === 'horizontalSplit' ? pane.width : pane.width * 2;
            } else {
              const newSplitHeight =
                pane.height === 1 ? pane.height : pane.height / 2;

              const newSplitWidth =
                pane.width === 1 ? pane.width : pane.width / 2;

              pane.height =
                splitType === 'verticalSplit' ? newSplitHeight : pane.height;
              pane.width =
                splitType === 'horizontalSplit' ? newSplitWidth : pane.width;
            }
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
