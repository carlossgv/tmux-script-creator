import { Paper } from '@mui/material';
import React, { ChangeEventHandler, MouseEventHandler, useEffect } from 'react';
import { useState } from 'react';
import { Layout, Pane } from '../Main/Main';
import PaneComponent from '../PaneComponent/PaneComponent';
import styles from './WindowComponent.module.css';

type Divisions = {
  columns: number;
  rows: number;
};

const createGrid = (layout: Layout): Divisions => {
  let divisions: Divisions = {} as Divisions;
  console.log(layout);
  switch (layout) {
    case Layout.Pane1:
      divisions = { columns: 1, rows: 1 };
      break;
    case Layout.Pane2V:
      divisions = { columns: 2, rows: 1 };
      break;
    case Layout.Pane2H:
      divisions = { columns: 1, rows: 2 };
      break;
    case Layout.Pane3V:
      divisions = { columns: 3, rows: 1 };
      break;
    default:
      divisions = { columns: 2, rows: 2 };
      break;
  }

  return divisions;
};

const WindowComponent = ({
  panesData,
  handleAddCommand,
  handleRemoveCommand,
  handleUpdateCommand,
  layout,
}: {
  panesData: Array<Pane>;
  handleAddCommand: MouseEventHandler;
  handleRemoveCommand: MouseEventHandler;
  handleUpdateCommand: ChangeEventHandler;
  layout: Layout;
}) => {
  const [panes, setPanes] = React.useState<JSX.Element[]>([]);
  const [grid, setGrid] = React.useState<JSX.Element[]>([]);
  const [divisions, setDivisions] = React.useState<Divisions>({
    columns: 1,
    rows: 1,
  });

  useEffect(() => {
    setDivisions(createGrid(layout));

    console.log(divisions);

    setPanes(
      panesData.map((paneData) => {
        return (
          <PaneComponent
            key={`${paneData.xCoordinate}_${paneData.yCoordinate}`}
            paneData={paneData}
            handleAddCommand={handleAddCommand}
            handleRemoveCommand={handleRemoveCommand}
            handleUpdateCommand={handleUpdateCommand}
          />
        );
      })
    );
  }, [
    handleAddCommand,
    handleRemoveCommand,
    handleUpdateCommand,
    panesData,
    layout,
  ]);

  return (
    <Paper
      elevation={8}
      className={styles.root}
      style={{
        gridTemplateColumns: `repeat(${divisions.columns}, 1fr)`,
        gridTemplateRows: `repeat(${divisions.rows}, 1fr)`,
      }}
    >
      {panes}
    </Paper>
  );
};

export default WindowComponent;
