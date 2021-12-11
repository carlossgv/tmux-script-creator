import { Paper, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { FC } from 'react';
import ResultScript from '../ResultScript/ResultScript';
import WindowButtonPad from '../WindowButtonPad/WindowButtonPad';
import WindowComponent from '../WindowComponent/WindowComponent';
import styles from './Main.module.css';

type Window = {
  name: string;
  panes: Pane[];
};

export type Pane = {
  commands: string[];
};

const Main: FC = () => {
  const [sessionState, setSessionState] = React.useState({
    name: '',
    windows: [{ name: 'window 0', panes: [{ commands: [] }] }],
  });

  const [windowsState, setWindowsState] = React.useState<string[]>(
    sessionState.windows.map((window) => window.name)
  );

  useEffect(() => {
    setWindowsState(sessionState.windows.map((window) => window.name));
  }, [sessionState]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSessionState({
      ...sessionState,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Paper className={styles.main}>
      <div className={styles.mainInfo}>
        <TextField
          type="text"
          label="Session Name"
          name="name"
          onChange={handleChange}
          required
        />
        <WindowButtonPad buttonsData={windowsState} />
      </div>
      <div className={styles.creationContainer}>
        {/* <WindowComponent /> */}
        <ResultScript session={sessionState} />
      </div>
    </Paper>
  );
};

export default Main;
