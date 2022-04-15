import { Paper } from '@mui/material';
import React, { ChangeEventHandler, MouseEventHandler, useEffect } from 'react';
import { Container } from '../../utils/panes/panes.utils';
import { Layout } from '../Main/Main';
import { Pane } from '../PaneComponent/pane.interface';
import PaneComponent from '../PaneComponent/PaneComponent';
import styles from './WindowComponent.module.css';

type Divisions = {
  columns: number;
  rows: number;
};

const createGrid = (layout: Layout): Divisions => {
  let divisions: Divisions = {} as Divisions;
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
  handleUpdateCommands,
  layout,
}: {
  panesData: Container[];
  handleUpdateCommands: ChangeEventHandler;
  layout: Layout;
}) => {
  const [panes, setPanes] = React.useState<JSX.Element[]>([]);
  const [divisions, setDivisions] = React.useState<Divisions>({
    columns: 1,
    rows: 1,
  });

  useEffect(() => {
    // setDivisions(createGrid(layout));
    console.log(panesData);

    const toRender = panesData.map((container, index) => {
      return (
        <div
          key={`container_${index}`}
          style={{
            display: 'flex',
            flexDirection:
              container.orientation === 'horizontal' ? 'row' : 'column',
          }}
        >
          {container.panes.map((paneData) => {
            return (
              <PaneComponent
                key={`${paneData.xCoordinate}_${paneData.yCoordinate}`}
                paneData={paneData}
                handleUpdateCommands={handleUpdateCommands}
              />
            );
          })}
        </div>
      );
    });

    setPanes(toRender);
    // panesData.map((paneData) => {
    //   return (
    //     <PaneComponent
    //       key={`${paneData.xCoordinate}_${paneData.yCoordinate}`}
    //       paneData={paneData}
    //       handleUpdateCommands={handleUpdateCommands}
    //     />
    //   );
    // })
  }, [handleUpdateCommands, panesData, layout]);

  return (
    <Paper elevation={8} className={styles.root}>
      {panes}
    </Paper>
  );
};

export default WindowComponent;
