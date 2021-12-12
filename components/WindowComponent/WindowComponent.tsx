import { Paper } from '@mui/material';
import React, { ChangeEventHandler, MouseEventHandler, useEffect } from 'react';
import { useState } from 'react';
import { Pane } from '../Main/Main';
import PaneComponent from '../PaneComponent/PaneComponent';
import styles from './WindowComponent.module.css';

type Coordinates = {
  x: number;
  y: number;
};

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
  const [maxCoordinates, setMaxCoordinates] = React.useState<Coordinates>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    // sort panes by xCoordinate
    let sortedPanes = panesData.sort((a, b) => a.xCoordinate - b.xCoordinate);
    // get max x coordinate
    let maxX = sortedPanes[sortedPanes.length - 1].xCoordinate;

    // sort panes by yCoordinate
    sortedPanes = sortedPanes.sort((a, b) => a.yCoordinate - b.yCoordinate);
    // get max y coordinate
    let maxY = sortedPanes[sortedPanes.length - 1].yCoordinate;

    console.log('maxX: ' + (maxX + 1));
    console.log('maxY: ' + (maxY + 1));

    setMaxCoordinates({ x: maxX, y: maxY });

    const busyCoordinates: Array<Coordinates> = [];

    console.log(panesData);

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
    <Paper
      elevation={8}
      className={styles.root}
      style={{
        gridTemplateColumns: `repeat(${maxCoordinates.x + 1}, 1fr)`,
        gridTemplateRows: `repeat(${maxCoordinates.y + 1}, 1fr)`,
      }}
    >
      {panes}
    </Paper>
  );
};

export default WindowComponent;
