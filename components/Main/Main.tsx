import {
  Button,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import React, { ChangeEvent, ChangeEventHandler, useEffect } from 'react';
import { FC } from 'react';
import ResultScript from '../ResultScript/ResultScript';
import WindowButtonPad from '../WindowButtonPad/WindowButtonPad';
import { Window } from '../WindowComponent/Window.interface';
import WindowComponent from '../WindowComponent/WindowComponent';
import styles from './Main.module.css';
import { createPanes, LayoutContainer } from '../../utils/panes/panes.utils';
import { getCookie, removeCookies, setCookies } from 'cookies-next';
import { Pane } from '../PaneComponent/pane.interface';

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

export interface Session {
  name: string;
  windows: Window[];
}

const initialWindow: Window = {
  id: 0,
  name: 'window 0',
  containers: {
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
  },

  layout: Layout.Pane1,
};

const Main: FC = () => {
  const emptySession: Session = {
    name: '',
    windows: [initialWindow],
  };

  const savedSession = getCookie('session')
    ? //@ts-ignore: null possibility handled properly
      JSON.parse(getCookie('session'))
    : emptySession;

  const [session, setSession] = React.useState<Session>(
    savedSession || emptySession
  );

  const resetSession = () => {
    setSession(emptySession);
    window.location.reload();
  };

  useEffect(() => {
    const cookie = getCookie('session');

    if (cookie) {
      removeCookies('session');
    }

    setCookies('session', JSON.stringify(session));
  }, [session]);

  const [windowsState, setWindowsState] = React.useState<string[]>(
    session.windows.map((window: Window) => window.name)
  );

  const [activeWindow, setActiveWindow] = React.useState<Window>(
    session.windows[0]
  );

  useEffect(() => {
    setWindowsState(session.windows.map((window: Window) => window.name));
  }, [session.windows]);

  const handleChangeSessionName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSession({
      ...session,
      name: event.target.value,
    });
  };

  const handleAddNewWindow = () => {
    const newWindow: Window = {
      ...initialWindow,
      id: session.windows.length,
      name: `window ${session.windows.length}`,
    };

    session.windows.forEach(
      (window: Window, index: number) => (window.id = index)
    );

    const updatedWindows = [...session.windows];
    updatedWindows.push(newWindow);

    console.log('adding new window');
    console.log('updated windows length: ', updatedWindows.length);

    setSession({
      ...session,
      windows: [...updatedWindows],
    });

    setActiveWindow(newWindow);
  };

  const removeWindow = (event: any) => {
    const index = parseInt(event.target.parentElement.id.split('_')[2]);

    if (session.windows.length === 1) {
      return;
    }

    setSession({
      ...session,
      windows: session.windows.filter(
        (_window: Window, i: number) => i !== index
      ),
    });
  };

  const renameWindow = (event: any) => {
    const index = parseInt(
      event.target.parentElement.parentElement.parentElement.id.split('_')[2]
    );

    console.log('renaming window amount of windows:' + session.windows.length);

    setSession({
      ...session,
      windows: session.windows.map((window: Window, i: number) =>
        i === index ? { ...window, name: event.target.value } : window
      ),
    });

    setActiveWindow(session.windows[index]);
  };

  const updatePane = (event: ChangeEvent<Element>) => {
    const paneId = event.target.id;
    const paneX = parseInt(paneId.split('_')[1]);
    const paneY = parseInt(paneId.split('_')[2]);

    console.log('before update Pane length: ', session.windows.length);
    console.log('value: ', event.target.value);

    const updatedWindows: Window[] = session.windows.map((window: Window) => {
      if (window.id === activeWindow.id) {
        console.log('entering active window updating pane');
        window.containers.panes.forEach((pane: Pane | LayoutContainer) => {
          if (pane.xCoordinate === paneX && pane.yCoordinate === paneY) {
            console.log('inside the pane');
            pane.commands = event.target.value;
          } else if (pane?.orientation) {
            pane.panes.forEach((pane: Pane) => {
              if (pane.xCoordinate === paneX && pane.yCoordinate === paneY) {
                pane.commands = event.target.value;
              }
            });
          }
        });
        return window;
      } else {
        return window;
      }
    });

    console.log('updating pane');
    console.log('updatedWindows length: ', updatedWindows.length);

    setSession({
      ...session,
      windows: [...updatedWindows],
    });
  };

  const updateLayout = (event: SelectChangeEvent<Layout>) => {
    console.log('updating layout amount of windows', session.windows.length);
    const newWindows: Window[] = session.windows.map((window: Window) => {
      if (window.id === activeWindow.id) {
        window.layout = event.target.value;
        const containers = createPanes(window.layout);
        window.containers = containers;
        setActiveWindow(window);
        return window;
      } else {
        return window;
      }
    });
    console.log('updating layout');
    console.log('windows lenght in updateLayout', newWindows.length);
    setSession({
      ...session,
      windows: newWindows,
    });
  };

  return (
    <Paper className={styles.main}>
      <div className={styles.mainInfo}>
        <div className={styles.leftInfo}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              type="text"
              label="Session Name"
              name="sessionName"
              onChange={handleChangeSessionName}
              size="small"
              value={session.name}
              required
            />
            <Select
              onChange={updateLayout}
              value={activeWindow.layout}
              size="small"
              style={{ height: '100%' }}
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
            buttonsData={session.windows}
            addNewWindow={handleAddNewWindow}
            handleRemoveWindow={removeWindow}
            handleRenameWindow={renameWindow}
            activeWindow={activeWindow.id}
          />
        </div>
        <div className={styles.rightInfo}>
          <Button variant="contained" color="error" onClick={resetSession}>
            Reset Session
          </Button>
        </div>
      </div>
      <div className={styles.creationContainer}>
        <WindowComponent
          panesData={activeWindow.containers}
          handleUpdatePane={updatePane}
        />
        <ResultScript session={session} />
      </div>
    </Paper>
  );
};

export default Main;
