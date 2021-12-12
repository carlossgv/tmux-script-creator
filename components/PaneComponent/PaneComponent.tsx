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
}: {
  paneData: Pane;
  handleAddCommand: MouseEventHandler;
  handleRemoveCommand: MouseEventHandler;
  handleUpdateCommand: ChangeEventHandler;
}) => {
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
            onKeyDown={(e) => {
              e.key === 'Enter' ? console.log('I need to fix this!') : null;
            }}
            size="small"
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
      style={{
        gridColumnStart: paneData.xCoordinate + 1,
        gridRowStart: paneData.yCoordinate + 1,
        gridColumnEnd: paneData.xCoordinate + 1 + paneData.width,
        gridRowEnd: paneData.yCoordinate + 1 + paneData.height,
      }}
    >
      <div className={styles.commandsContainer}>{commandsComponent}</div>
    </Paper>
  );
};

export default PaneComponent;
