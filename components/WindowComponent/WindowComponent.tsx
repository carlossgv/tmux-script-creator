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

const WindowComponent = ({
  panesData,
  handleUpdatePane,
}: {
  panesData: LayoutContainer;
  handleUpdatePane: (pane: Pane) => void;
}) => {
  const [panes, setPanes] = React.useState<JSX.Element>();

  const createPanesLayout = useCallback((container: Pane | LayoutContainer) => {
    const innerLayout: JSX.Element[] = [];
    let containerId = 0;

    container.panes.forEach((pane: Pane | LayoutContainer) => {
      if (pane?.orientation) {
        innerLayout.push(createPanesLayout(pane));
      } else {
        innerLayout.push(
          <PaneComponent
            paneData={pane}
            handleUpdatePane={(pane) => handleUpdatePane(pane)}
            key={`pane_${pane.xCoordinate}_${pane.yCoordinate}`}
            id={`pane_${pane.xCoordinate}_${pane.yCoordinate}`}
          />
        );
      }
    });

    containerId++;

    return (
      <div
        className={styles.containerDiv}
        style={{ display: 'flex', flexDirection: container.orientation }}
        id={`container_${containerId - 1}`}
      >
        {innerLayout}
      </div>
    );
  }, []);

  useEffect(() => {
    setPanes(createPanesLayout(panesData));
  }, [createPanesLayout, panesData]);

  return (
    <Paper elevation={8} className={styles.root}>
      {panes}
    </Paper>
  );
};

export default WindowComponent;
