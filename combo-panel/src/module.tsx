import { PanelPlugin } from '@grafana/ui';

import { ComboPanel } from './components/ComboPanel';
import { ComboPanelEditor } from './components/ComboPanelEditor';

import { defaults, ComboOptions } from './types';

export const reactPanel = new PanelPlugin<ComboOptions>(ComboPanel);

reactPanel.setEditor(ComboPanelEditor);
reactPanel.setDefaults(defaults);
