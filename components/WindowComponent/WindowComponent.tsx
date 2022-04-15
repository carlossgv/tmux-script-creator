import { Paper } from '@mui/material';
import React, { ChangeEventHandler, MouseEventHandler, useEffect } from 'react';
import { LayoutContainer } from '../../utils/panes/panes.utils';
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
  panesData: LayoutContainer;
  handleUpdateCommands: ChangeEventHandler;
  layout: Layout;
}) => {
  const [panes, setPanes] = React.useState<JSX.Element[]>([]);
  const [divisions, setDivisions] = React.useState<Divisions>({
    columns: 1,
    rows: 1,
  });

  const iterateContainer = (container: LayoutContainer) => {
    // console.log('inside window component', JSON.stringify(container, null, 2));

    const innerLayout = container.panes.map((pane: Pane | LayoutContainer) => {
      if (pane.orientation) {
        iterateContainer(pane);
      } else {
        return (
          <PaneComponent
            paneData={pane}
            handleUpdateCommands={handleUpdateCommands}
            key={`pane_${pane.xCoordinate}_${pane.yCoordinate}`}
            id={`pane_${pane.xCoordinate}_${pane.yCoordinate}`}
          />
        );
      }
    });
    return (
      <div
        className={`container_div`}
        style={{ display: 'flex', flexDirection: container.orientation }}
      >
        {innerLayout}
      </div>
    );
  };

  useEffect(() => {
    // setDivisions(createGrid(layout));
    console.log(panesData);

    const toRender = iterateContainer(panesData);

    console.log(toRender);

    setPanes(toRender);
  }, [handleUpdateCommands, panesData, layout]);

  return (
    <Paper elevation={8} className={styles.root}>
      {panes}
    </Paper>
  );
};

export default WindowComponent;
