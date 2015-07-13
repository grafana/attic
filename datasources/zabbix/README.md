# Grafana-Zabbix

## Zabbix datasource for Grafana dashboard

Display your Zabbix data directly in Grafana dashboards!

![Dashboard](https://cloud.githubusercontent.com/assets/4932851/8269101/9e6ee67e-17a3-11e5-85de-fe9dcc2dd375.png)

#### [Documentation](https://github.com/alexanderzobnin/grafana-zabbix/wiki)
1. [**Overview**](https://github.com/alexanderzobnin/grafana-zabbix/wiki/Overview)
2. [**Installation**](https://github.com/alexanderzobnin/grafana-zabbix/wiki/Installation)
  - [Grafana 1.9.x](https://github.com/alexanderzobnin/grafana-zabbix/wiki/Installation#grafana-19x)
  - [Grafana 2.x.x](https://github.com/alexanderzobnin/grafana-zabbix/wiki/Installation#grafana-20x)
3. [**User’s Guide**](https://github.com/alexanderzobnin/grafana-zabbix/wiki/Usage)
  - [Query editor](https://github.com/alexanderzobnin/grafana-zabbix/wiki/Usage#query-editor)
    - [Filters](https://github.com/alexanderzobnin/grafana-zabbix/wiki/Usage#filters)
    - [Scale](https://github.com/alexanderzobnin/grafana-zabbix/wiki/Usage#scale)
  - [Templates](https://github.com/alexanderzobnin/grafana-zabbix/wiki/Usage#templates)
    - [Templated variable editor](https://github.com/alexanderzobnin/grafana-zabbix/wiki/Usage#templated-variable-editor)
    - [Creating templated dashboard](https://github.com/alexanderzobnin/grafana-zabbix/wiki/Usage#creating-templated-dashboard)
  - [Annotations](https://github.com/alexanderzobnin/grafana-zabbix/wiki/Usage#annotations)
4. [**Troubleshooting**](https://github.com/alexanderzobnin/grafana-zabbix/wiki/Troubleshooting)

## Features

#### Flexible metric editor
 * hosts and items filtering
 * Custom scale for each target

#### Templated dashboards support
Group, host, application or item names can be replaced with a template variable. This allows you to create generic dashboards that can quickly be changed to show stats for a specific cluster, server or application.

#### Annotations support
 * Display zabbix events on graphs
 * Show acknowledges for problems
