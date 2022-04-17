import { TextField } from '@mui/material';
import React, {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useState,
} from 'react';
import { Pane } from './pane.interface';
import styles from './PaneComponent.module.css';

const PaneComponent = ({
  paneData,
  handleUpdatePane,
}: {
  paneData: Pane;
  handleUpdatePane: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}) => {
  const [pane, setPane] = useState<Pane>(paneData);

  useEffect(() => {
    console.log('inside pane', paneData.commands);
    setPane(paneData);
  }, [paneData]);

  return (
    <div className={styles.root}>
      <div style={{ display: 'flex', height: '100%' }}>
        <TextField
          id={`pane_${pane.xCoordinate}_${pane.yCoordinate}`}
          multiline
          value={pane.commands}
          className={styles.commandInput}
          onChange={handleUpdatePane}
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
