import { TextField } from '@mui/material';
import React, { ChangeEventHandler } from 'react';
import { Pane } from './pane.interface';
import styles from './PaneComponent.module.css';

const PaneComponent = ({
  paneData,
  handleUpdateCommands,
}: {
  paneData: Pane;
  handleUpdateCommands: ChangeEventHandler;
}) => {
  return (
    <TextField
      id={`pane_${paneData.xCoordinate}_${paneData.yCoordinate}`}
      multiline
      value={paneData.commands}
      className={styles.commandInput}
      onChange={handleUpdateCommands}
      placeholder="Enter commands here..."
    ></TextField>
  );
};

export default PaneComponent;
