import { Paper } from '@mui/material';
import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
} from 'react';
import { LayoutContainer } from '../../utils/panes/panes.utils';
import { Layout } from '../Main/Main';
import { Pane } from '../PaneComponent/pane.interface';
import PaneComponent from '../PaneComponent/PaneComponent';
import styles from './WindowComponent.module.css';

type Divisions = {
  columns: number;
  rows: number;
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
  const [panes, setPanes] = React.useState<JSX.Element>();

  const createPanesLayout = useCallback(
    (container: Pane | LayoutContainer) => {
      const innerLayout: JSX.Element[] = [];
      let containerId = 0;

      container.panes.forEach((pane: Pane | LayoutContainer) => {
        console.log(pane);
        if (pane?.orientation) {
          innerLayout.push(createPanesLayout(pane));
        } else {
          innerLayout.push(
            <PaneComponent
              paneData={pane}
              handleUpdateCommands={handleUpdateCommands}
              key={`pane_${pane.xCoordinate}_${pane.yCoordinate}`}
              id={`pane_${pane.xCoordinate}_${pane.yCoordinate}`}
            />
          );
        }
      });

      containerId++;

      return (
        <div
          className={`container_div`}
          style={{ display: 'flex', flexDirection: container.orientation }}
          id={`container_${containerId - 1}`}
        >
          {innerLayout}
        </div>
      );
    },
    [handleUpdateCommands]
  );

  useEffect(() => {
    const layout = createPanesLayout(panesData);

    setPanes(layout);
  }, [createPanesLayout, panesData]);

  return (
    <Paper elevation={8} className={styles.root}>
      {panes}
    </Paper>
  );
};

export default WindowComponent;
