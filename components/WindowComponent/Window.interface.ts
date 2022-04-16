import { LayoutContainer } from '../../utils/panes/panes.utils';
import { Layout } from '../Main/Main';
import { Pane } from '../PaneComponent/pane.interface';

export interface Window {
  id: number;
  name: string;
  containers: LayoutContainer;
  layout: Layout;
}
