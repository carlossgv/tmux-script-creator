import { useState } from 'react';
import { Pane } from '../Main/Main';

const WindowComponent = ({ panesData }: { panesData: Array<Pane> }) => {
  const [panes, setPanes] = useState(panesData);

  return <div>WindowComponent</div>;
};

export default WindowComponent;
