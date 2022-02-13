import { Layout } from '../Main/Main';
import { Pane } from '../PaneComponent/pane.interface';

export interface Window {
  id: number;
  name: string;
  panes: Pane[];
  layout: Layout;
}
