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
  const [grid, setGrid] = React.useState<JSX.Element[]>([]);

  useEffect(() => {
    console.log(panesData);

    // sort panes by xCoordinate
    const sortedPanes = panesData.sort((a, b) => a.xCoordinate - b.xCoordinate);

    // sot panes by yCoordinate
    const sortedPanesByY = sortedPanes.sort(
      (a, b) => a.yCoordinate - b.yCoordinate
    );

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
