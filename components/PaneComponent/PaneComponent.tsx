import { Paper, TextField } from '@mui/material';
import React, { ChangeEventHandler } from 'react';
import { Pane } from '../Main/Main';
import styles from './PaneComponent.module.css';

const PaneComponent = ({
  paneData,
  handleUpdateCommands,
}: {
  paneData: Pane;
  handleUpdateCommands: ChangeEventHandler;
}) => {

  return (
    <Paper
      className={styles.pane}
      id={`pane_${paneData.xCoordinate}_${paneData.yCoordinate}`}
      style={{
        gridColumnStart: paneData.xCoordinate + 1,
        gridRowStart: paneData.yCoordinate + 1,
        gridColumnEnd: paneData.xCoordinate + 1 + paneData.width,
        gridRowEnd: paneData.yCoordinate + 1 + paneData.height,
      }}
    >
      <div className={styles.commandsContainer}></div>
      <div className={styles.command} id={`commands_${paneData.xCoordinate}_${paneData.yCoordinate}`}>
        <TextField
          multiline
          value={paneData.commands}
          className={styles.commandInput}
          onChange={handleUpdateCommands}
        />
      </div >
    </Paper>
  );
};

export default PaneComponent;
