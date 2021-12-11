import { Paper, TextField } from '@mui/material';
import React from 'react';
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
    windows: [{ name: '', panes: [{ commands: [] }] }],
  });

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
        <WindowButtonPad />
      </div>
      <div className={styles.creationContainer}>
        <WindowComponent />
        <ResultScript session={sessionState} />
      </div>
    </Paper>
  );
};

export default Main;
