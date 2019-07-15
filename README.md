# Starter Panel Plugin for Grafana

A starter panel for a workshop.


## Workshop Instructions

## Workshop 1: Simple Starter Panel

The goal is to make a simple panel that can:

- Load a 3rd party library
- Set options via an options tab in edit mode

### Prerequisites

- Grafana
- Nodejs
- Npm
- Grunt.cli (`npm install -g grunt-cli`)
- Git
- A code editor or IDE
- Access to a Time Series Database (TSDB) datasource in Grafana (InfluxDB, Prometheus, Graphite, Elasticsearch or similar). The Grafana Testdata datasource which is included in Grafana can be used instead if this is not possible.

### Install the Starter Panel

Task: Get started with a template plugin

1. git clone https://github.com/grafana/starter-panel.git into the data/plugins directory of your running Grafana
(or git clone git@github.com:grafana/starter-panel.git if using ssh)
2. `cd starter-panel`
3. npm install
4. grunt && grunt watch
5. restart Grafana
6. Check that your new plugin is available in Grafana. Refresh the page then create a new dashboard, then add the panel called Starter.
7. Edit the panel and check that that you can change the background color option and the panel’s background changes color.

### Add a 3rd Party Library

Task: download luxon (a datetime library) and show a date on the panel

1. `git checkout -b workshop1`
2. Make a subdirectory in the src directory called lib
3. Download [luxon.js](https://moment.github.io/luxon/es6/luxon.min.js), rename it to luxon.js (slightly easier to import).
4. Copy it to <your grafana directory>/data/plugins/starter-panel/src/lib
5. Stop the grunt task and then run grunt && grunt watch again
6. Import the DateTime class:
    - `import { DateTime } from './lib/luxon'`;
    - `this.date = DateTime.local();`
7. Use the date field in the module.html partial

### Create Panel Properties for Font Size and Font Weight

Task: Add two new properties to the panel and use them to control the font size and font weight for the date text on the panel

## Workshop 2: Simple Metric Panel

The goal is to start with the starter panel and show data from InfluxDB/Prometheus/other TSDB on the panel.

### Getting Started

Task: Learn about the data format for time series data.

1. Make sure you start with a clean repo (you either need to commit your changes from workshop 1 or do a `git reset --hard`):
2. `git checkout master`
3. `git checkout -b workshop2`
4. `grunt && grunt watch`
5. Create a new dashboard with a new Starter panel. Create a metric query on the Metric tab with a Time Series db (InfluxDB or Prometheus for example)
6. Examine the data in the Query Inspector
7. Use console.log or a debugger to examine the data that is returned from the query in the onDataReceived function.

### Show the Current Value from the Metric Query

Task: Parse the data from the metric query and show the current value using Grafana’s timeseries2 core library.

1. `import TimeSeries from 'app/core/time_series2';`
2. Map the dataList parameter into an array of TimeSeries objects
3. Use the TimeSeries getFlotPairs function to generate stats per series (stats are aggregations like average, min, max and current)
4. Create a field called currentValue and set it to the first serie’s current value:
    - `this.currentValue = series[0].stats['current'];`
5. Show this in module.html:
    - `<span>Current: {{ctrl.currentValue}}</span>`

### Save Snapshot Data

Task: Save and load snapshot data for the panel

1. This is already implemented so test creating a snapshot. Grafana automatically saves snapshots for the MetricPanelCtrl.

### Create a Simple Multistat

Task: Instead of just showing the current value for the first serie, show a singlestat panel per serie returned from a metric query.
