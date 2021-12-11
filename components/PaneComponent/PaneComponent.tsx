import { Button, Paper, TextField } from '@mui/material';
import React, { ChangeEventHandler, MouseEventHandler, useEffect } from 'react';
import { Pane } from '../Main/Main';
import styles from './PaneComponent.module.css';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';

const PaneComponent = ({
  paneData,
  handleAddCommand,
  handleRemoveCommand,
  handleUpdateCommand,
  handleSplit,
}: {
  paneData: Pane;
  handleAddCommand: MouseEventHandler;
  handleRemoveCommand: MouseEventHandler;
  handleUpdateCommand: ChangeEventHandler;
  handleSplit: MouseEventHandler;
}) => {
  const [commands, setCommands] = React.useState<string[]>(paneData.commands);
  const [commandsComponent, setCommandsComponent] = React.useState<
    JSX.Element[]
  >([]);

  useEffect(() => {
    setCommandsComponent(
      paneData.commands.map((command, index) => (
        <div key={index} className={styles.command} id={`command_${index}`}>
          <TextField
            label={`Command #${index + 1}`}
            value={command}
            className={styles.commandInput}
            onChange={handleUpdateCommand}
          />
          <Button
            variant="contained"
            className={styles.commandButton}
            onClick={handleAddCommand}
            name="addButton"
          >
            <AddIcon className={styles.icon} />
          </Button>
          <Button
            variant="contained"
            className={styles.commandButton}
            onClick={handleRemoveCommand}
          >
            <ClearIcon className={styles.icon} />
          </Button>
        </div>
      ))
    );
  }, [
    paneData.commands,
    handleAddCommand,
    handleRemoveCommand,
    handleUpdateCommand,
  ]);

  return (
    <Paper
      className={styles.pane}
      id={`pane_${paneData.xCoordinate}_${paneData.yCoordinate}`}
    >
      <div className={styles.commandsContainer}>{commandsComponent}</div>
      <div className={styles.buttonsContainer}>
        <Button
          className={styles.button}
          variant="contained"
          onClick={handleSplit}
          name="verticalSplit"
        >
          Split Vertically
        </Button>
        <Button
          className={styles.button}
          variant="contained"
          onClick={handleSplit}
          name="horizontalSplit"
        >
          Split Horizontally
        </Button>
      </div>
    </Paper>
  );
};

export default PaneComponent;
