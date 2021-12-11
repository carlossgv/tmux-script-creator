import { Paper } from '@mui/material';
import React, { ChangeEventHandler, MouseEventHandler, useEffect } from 'react';
import { useState } from 'react';
import { Pane } from '../Main/Main';
import PaneComponent from '../PaneComponent/PaneComponent';
import styles from './WindowComponent.module.css';

const WindowComponent = ({
  panesData,
  handleAddCommand,
  handleRemoveCommand,
  handleUpdateCommand,
  handleSplit,
}: {
  panesData: Array<Pane>;
  handleAddCommand: MouseEventHandler;
  handleRemoveCommand: MouseEventHandler;
  handleUpdateCommand: ChangeEventHandler;
  handleSplit: MouseEventHandler;
}) => {
  const [panes, setPanes] = React.useState<JSX.Element[]>([]);

  useEffect(() => {
    setPanes(
      panesData.map((paneData) => {
        return (
          <PaneComponent
            key={`${paneData.xCoordinate}_${paneData.yCoordinate}`}
            paneData={paneData}
            handleAddCommand={handleAddCommand}
            handleRemoveCommand={handleRemoveCommand}
            handleUpdateCommand={handleUpdateCommand}
            handleSplit={handleSplit}
          />
        );
      })
    );
  }, [
    handleAddCommand,
    handleRemoveCommand,
    handleSplit,
    handleUpdateCommand,
    panesData,
  ]);

  return (
    <Paper elevation={8} className={styles.root}>
      {panes}
    </Paper>
  );
};

export default WindowComponent;
