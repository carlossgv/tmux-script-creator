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
      style={{
        gridColumnStart: paneData.xCoordinate + 1,
        gridRowStart: paneData.yCoordinate + 1,
        gridColumnEnd: paneData.xCoordinate + 1 + paneData.width,
        gridRowEnd: paneData.yCoordinate + 1 + paneData.height,
      }}
      multiline
      value={paneData.commands}
      className={styles.commandInput}
      onChange={handleUpdateCommands}
    ></TextField>
  );
};

export default PaneComponent;
