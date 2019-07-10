import { PanelPlugin } from '@grafana/ui';
import { RssPanel } from './components/RssPanel';
import { RssPanelEditor } from './components/RssPanelEditor';
import { defaults, RssOptions } from './types';

export const plugin = new PanelPlugin<RssOptions>(RssPanel);

plugin.setEditor(RssPanelEditor);
plugin.setDefaults(defaults);
