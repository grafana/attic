import { PanelPlugin } from '@grafana/ui';

import { ComboPanel } from './components/ComboPanel';
import { ComboPanelEditor } from './components/ComboPanelEditor';

import { defaults, ComboOptions } from './types';

export const plugin = new PanelPlugin<ComboOptions>(ComboPanel);

plugin.setEditor(ComboPanelEditor);
plugin.setDefaults(defaults);
