import { TextField } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Pane } from './pane.interface';
import styles from './PaneComponent.module.css';

const PaneComponent = ({
  paneData,
  handleUpdatePane,
}: {
  paneData: Pane;
  handleUpdatePane: (pane: Pane) => void;
}) => {
  const [commands, setCommands] = useState(paneData.commands);

  const handleChangeCommands = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCommands(event.target.value);
  };

  useEffect(() => {
    const pane = { ...paneData, commands: commands };
    handleUpdatePane(pane);
  }, [commands, handleUpdatePane, paneData]);

  return (
    <div className={styles.root}>
      <div style={{ display: 'flex', height: '100%' }}>
        <TextField
          id={`pane_${paneData.xCoordinate}_${paneData.yCoordinate}`}
          multiline
          value={commands}
          className={styles.commandInput}
          onChange={handleChangeCommands}
          placeholder="Enter commands here..."
          style={{ width: '80%' }}
        ></TextField>
        <TextField label="Height" style={{ width: '20%' }}></TextField>
      </div>
      <div>
        <TextField label="Width"></TextField>
      </div>
    </div>
  );
};

export default PaneComponent;
