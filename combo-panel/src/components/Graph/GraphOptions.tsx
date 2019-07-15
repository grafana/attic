import React, { PureComponent } from 'react';
import { PanelEditorProps, PanelOptionsGroup, Switch } from '@grafana/ui';
import { ComboOptions } from '../../types';

export class GraphOptions extends PureComponent<
  PanelEditorProps<ComboOptions>
> {
  labelWidth = 8;

  onToggleBars = () =>
    this.props.onChange({
      ...this.props.options,
      showBars: !this.props.options.showBars,
    });

  onToggleLines = () =>
    this.props.onChange({
      ...this.props.options,
      showLines: !this.props.options.showLines,
    });

  onTogglePoints = () =>
    this.props.onChange({
      ...this.props.options,
      showPoints: !this.props.options.showPoints,
    });

  render() {
    const { showBars, showLines, showPoints } = this.props.options;
    return (
      <PanelOptionsGroup title="Graph">
        <Switch
          label="Show bars"
          labelClass={`width-${this.labelWidth}`}
          checked={showBars}
          onChange={this.onToggleBars}
        />

        <Switch
          label="Show lines"
          labelClass={`width-${this.labelWidth}`}
          checked={showLines}
          onChange={this.onToggleLines}
        />
        <Switch
          label="Show points"
          labelClass={`width-${this.labelWidth}`}
          checked={showPoints}
          onChange={this.onTogglePoints}
        />
      </PanelOptionsGroup>
    );
  }
}
