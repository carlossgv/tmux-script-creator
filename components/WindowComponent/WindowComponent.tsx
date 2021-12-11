import { Paper } from '@mui/material';
import React, { MouseEventHandler, useEffect } from 'react';
import { useState } from 'react';
import { Pane } from '../Main/Main';
import PaneComponent from '../PaneComponent/PaneComponent';
import styles from './WindowComponent.module.css';

const WindowComponent = ({
  panesData,
  handleAddCommandToPane,
}: {
  panesData: Array<Pane>;
  handleAddCommandToPane: MouseEventHandler;
}) => {
  const [panes, setPanes] = React.useState<JSX.Element[]>([]);

  useEffect(() => {
    setPanes(
      panesData.map((paneData) => {
        return (
          <PaneComponent
            key={`${paneData.xCoordinate}_${paneData.yCoordinate}`}
            paneData={paneData}
            handleAddCommand={handleAddCommandToPane}
          />
        );
      })
    );
  }, [handleAddCommandToPane, panesData]);

  return (
    <Paper elevation={8} className={styles.root}>
      {panes}
    </Paper>
  );
};

export default WindowComponent;
