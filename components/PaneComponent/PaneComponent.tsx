import { Button, Paper, TextField } from '@mui/material';
import React, { MouseEventHandler, useEffect } from 'react';
import { Pane } from '../Main/Main';
import styles from './PaneComponent.module.css';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';

const PaneComponent = ({
  paneData,
  handleAddCommand,
}: {
  paneData: Pane;
  handleAddCommand: MouseEventHandler;
}) => {
  const [commands, setCommands] = React.useState<string[]>(paneData.commands);
  const [commandsComponent, setCommandsComponent] = React.useState<
    JSX.Element[]
  >([]);

  useEffect(() => {
    setCommandsComponent(
      paneData.commands.map((command, index) => (
        <div key={index} className={styles.commandContainer}>
          <TextField
            label={`Command ${index + 1}`}
            value={command}
            className={styles.commandInput}
          />
          <Button
            variant="contained"
            className={styles.commandButton}
            onClick={handleAddCommand}
            name="addButton"
          >
            <AddIcon className={styles.icon} />
          </Button>
          <Button variant="contained" className={styles.commandButton}>
            <ClearIcon className={styles.icon} />
          </Button>
        </div>
      ))
    );
  }, [paneData.commands, handleAddCommand]);

  return (
    <Paper
      className={styles.pane}
      id={`pane_${paneData.xCoordinate}_${paneData.yCoordinate}`}
    >
      {commandsComponent}
      <div className={styles.buttonsContainer}>
        <Button className={styles.button} variant="contained">
          Split Vertically
        </Button>
        <Button className={styles.button} variant="contained">
          Split Horizontally
        </Button>
      </div>
    </Paper>
  );
};

export default PaneComponent;
