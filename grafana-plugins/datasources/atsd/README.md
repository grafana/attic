# Axibase Time Series Database plugin for Grafana

Axibase Time Series Database was designed from the ground-up to store and analyze time-series data at scale. Unlike traditional databases it comes with Rule Engine, Data Versioning, SQL Query Language, Data Forecasting and more. [Learn more about ATSD on axibase.com](http://axibase.com/products/axibase-time-series-database/) 

## Installation guide

Copy ```atsd/``` into ```<grafana-2.x.x source directory>/public/app/plugins/datasource/``` directory and restart Grafana server. Then proceed as you would normally do with any built-in plugin by adding it through the data source menu.
Be sure to set URL to the http port of your ATSD installation.
User and Password should be set to the ATSD user.
![Datasource](https://axibase.com/wp-content/uploads/2015/09/18-datasource.png)

## Query editor overview

Example portal built with the ATSD data source:
![Overall](https://axibase.com/wp-content/uploads/2015/09/17-overall.png)

* Clicking the 'Submit' button results in a time series request. The 'Cache' button is for dropping the meta-data cache (described below).
![Default](https://axibase.com/wp-content/uploads/2015/09/00-default.png)

* Disconnect interval option makes use of Grafana's null point mode. If there is a gap in data bigger than the indicated value, visually it will behave as if the gap was filled with nulls.
Supported 'Disconnect' format is a number followed by a letter (corresponding to the time frame), e.g. `15s`, `5m`, `2h`, `1w` etc.
Supported values: `s` - seconds, `m` - minutes, `h` or `H` - hours, `d` - days, `w` - weeks, `M` - months, `y` - years.
![Disconnect](https://axibase.com/wp-content/uploads/2015/09/01-disconnect.png)

* There is auto-complete in the entity field. This and other meta-data request results, such as metric lists and tag combinations, are cached for 5 minutes, and you can drop the cache with the 'Cache' button.
[Learn more about Entities, Metrics and Tags on the Axibase website.](http://axibase.com/products/axibase-time-series-database/data-model/)
![Entity](https://axibase.com/wp-content/uploads/2015/09/02-entity.png)

* The same works for the metric field.
![Metric](https://axibase.com/wp-content/uploads/2015/09/03-metric.png)

* For the long point-separated metric names there is a token mode like the one in Graphite data source.
![Metric mode](https://axibase.com/wp-content/uploads/2015/09/04-metric_mode.png)

* '+' to add a new token, 'X' to delete the last one, 'tick' to finish.
![Segment 1](https://axibase.com/wp-content/uploads/2015/09/05-segment_1.png)
![Segment 2](https://axibase.com/wp-content/uploads/2015/09/06-segment_2.png)
![Segment 3](https://axibase.com/wp-content/uploads/2015/09/07-segment_3.png)

* This is what it looks like in the end.
![As tokens](https://axibase.com/wp-content/uploads/2015/09/08-as_tokens.png)

* You can switch between modes by clicking 'as tokens' / 'as text'.
![As text](https://axibase.com/wp-content/uploads/2015/09/09-as_text.png)

* The queries support all ATSD statistic aggregators. Supported Aggregators: *Detail*, *Count*, *Minimum*, *Maximum*, *Average*, *Median*, *Sum*, *Percentile 99.9%*, *Percentile 99.5%*, *Percentile 99%*, *Percentile 95%*, *Percentile 90%*, *Percentile 75%*, *First value*, *Last value*, *Delta*, *Weighted average*, *Weighted time average*, *Standard deviation*.
![Aggregator](https://axibase.com/wp-content/uploads/2015/09/10-aggregator.png)

* You can denote the aggregation period.
Supported 'Period' format is a number followed by a letter (corresponding to the time frame), e.g. `15s`, `5m`, `2h`, `1w` etc.
Supported values: `s` - seconds, `m` - minutes, `h` or `H` - hours, `d` - days, `w` - weeks, `M` - months, `y` - years.
![Period](https://axibase.com/wp-content/uploads/2015/09/11-period.png)

* There are two tag editing modes. The first one is 'Tag editor', where you add tag name-value pairs one by one with the help of auto-complete.
![Tag name](https://axibase.com/wp-content/uploads/2015/09/12-tag_name.png)

* Auto-complete shows only the possible values, taking into account all the previous tags.
![Tag value](https://axibase.com/wp-content/uploads/2015/09/13-tag_value.png)

* '+' to add a new name-value pair, 'X' to delete the last one. You can use ATSD regular expressions to match more than one tag value.
![Tag editor](https://axibase.com/wp-content/uploads/2015/09/14-tag_editor.png)

* Tag selector, on the other hand, shows all the possible tag combinations and allows to pick the ones you want to plot on a graph.
![Tag selector](https://axibase.com/wp-content/uploads/2015/09/15-tag_selector.png)

* After clicking the 'Submit' button the graph appears.
![Result](https://axibase.com/wp-content/uploads/2015/09/16-result.png)
