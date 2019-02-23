import React, { PureComponent } from 'react';

import { PanelOptionsGroup } from '@grafana/ui';

interface Props {
  onChange: (layout: string) => void;
  selectedLayout: string;
}

const layoutOptions = [
  { value: 'bigtext', label: 'Big Text' },
  { value: 'biggraph', label: 'Big Graph' },
  { value: 'biggauge', label: 'Big Gauge' },
];

export class LayoutOptions extends PureComponent<Props> {
  render() {
    const { onChange, selectedLayout } = this.props;

    return (
      <PanelOptionsGroup title="Layout">
        <div
          style={{
            width: '50%',
            display: 'flex',
          }}
        >
          {layoutOptions.map((layout, index) => {
            const isActive = selectedLayout === layout.value;
            return (
              <div
                key={`${layout.value}-${index}`}
                onClick={() => onChange(layout.value)}
                style={{
                  margin: '0 8px',
                  padding: '10px',
                  border: '1px solid white',
                  borderRadius: '3px',
                  backgroundColor: isActive && '#393737',
                  cursor: isActive ? 'auto' : 'pointer',
                  pointerEvents: isActive ? 'none' : 'auto',
                }}
              >
                {layout.label}
              </div>
            );
          })}
        </div>
      </PanelOptionsGroup>
    );
  }
}
