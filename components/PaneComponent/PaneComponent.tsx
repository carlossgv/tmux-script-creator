import { Paper, TextField } from '@mui/material';
import React, { ChangeEventHandler } from 'react';
import { Pane } from './pane.interface';
import styles from './PaneComponent.module.css';

const PaneComponent = ({
  paneData,
  handleUpdateCommands,
}: {
  paneData: Pane;
  handleUpdateCommands: ChangeEventHandler;
}) => {
  return (
    <Paper
      style={{
        gridColumnStart: paneData.xCoordinate + 1,
        gridRowStart: paneData.yCoordinate + 1,
        gridColumnEnd: paneData.xCoordinate + 1 + paneData.width,
        gridRowEnd: paneData.yCoordinate + 1 + paneData.height,
      }}
    >
      <div className={styles.layout}>
        <div className={styles.leftContainer}>
          <TextField
            id={`pane_${paneData.xCoordinate}_${paneData.yCoordinate}`}
            multiline
            value={paneData.commands}
            className={styles.commandInput}
            onChange={handleUpdateCommands}
            placeholder="Enter commands here..."
          ></TextField>
          {paneData.widthPercentage && (
            <div className={styles.widthContainer}>
              <TextField
                type="number"
                label="Width %"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{ style: { textAlign: 'center' } }}
                defaultValue={paneData.widthPercentage}
                onChange={(percentage) =>
                  handleUpdateSizes(percentage, 'width')
                }
              ></TextField>
            </div>
          )}
        </div>
        {paneData.heightPercentage && (
          <div className={styles.rightContainer}>
            <TextField
              type="number"
              label="Height %"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{ style: { textAlign: 'center' } }}
              defaultValue={paneData.heightPercentage}
            ></TextField>
          </div>
        )}
      </div>
    </Paper>
  );
};

export default PaneComponent;
