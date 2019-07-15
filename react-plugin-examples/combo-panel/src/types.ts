import {
  GrafanaTheme,
  Threshold,
  TimeRange,
  TimeSeriesVMs,
  ValueMapping,
} from '@grafana/ui';

export interface ComboOptions {
  valueMappings: ValueMapping[];
  maxValue: number;
  minValue: number;
  showThresholdLabels: boolean;
  showThresholdMarkers: boolean;
  layout: string;
  thresholds: Threshold[];
  valueOptions: SingleStatValueOptions;
  showLines: boolean;
  showBars: boolean;
  showPoints: boolean;
}

export interface SingleStatValueOptions {
  unit: string;
  suffix: string;
  stat: string;
  prefix: string;
  decimals?: number | null;
}

export const defaults: ComboOptions = {
  minValue: 0,
  maxValue: 100,
  layout: 'biggauge',
  showThresholdMarkers: true,
  showThresholdLabels: false,
  showLines: true,
  showBars: false,
  showPoints: false,
  valueOptions: {
    prefix: '',
    suffix: '',
    decimals: null,
    stat: 'avg',
    unit: 'none',
  },
  valueMappings: [],
  thresholds: [{ index: 0, value: -Infinity, color: 'green' }],
};

export interface LayoutProps {
  timeSeries: TimeSeriesVMs;
  timeRange: TimeRange;
  width: number;
  height: number;
  options: ComboOptions;
  onInterpolate: (value: string, format?: string) => string;
  theme: GrafanaTheme;
  valueMappings: ValueMapping[];
  thresholds: Threshold[];
}
