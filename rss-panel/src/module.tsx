import { PanelPlugin } from '@grafana/ui';
import { RssPanel } from './components/RssPanel';
import { RssPanelEditor } from './components/RssPanelEditor';
import { defaults, RssOptions } from './types';

export const reactPanel = new PanelPlugin<RssOptions>(RssPanel);

reactPanel.setEditor(RssPanelEditor);
reactPanel.setDefaults(defaults);
