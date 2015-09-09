==================================
grafana2-gnocchi-datasource-plugin
==================================

Grafana 2 - Gnocchi datasource Plugin
=====================================

This is a plugin that allows Grafana 2 to support Gnocchi as a datasource.

This has been developed for Grafana 2.1.

Installation
============

Copy all files into <grafana_installation_directory>/public/app/plugins/datasource/gnocchi

Developement and Tests
======================

    git clone https://github.com/grafana/grafana-plugins grafana-plugins
    ln -s $(pwd)/grafana-plugins/datasources/gnocchi <grafana_src_directory>/public/app/plugins/datasource/gnocchi
    ln -s <grafana_src_directory>/public/app/plugins/datasource/gnocchi/specs.js <grafana_src_directory>/public/test/specs/gnocchi-specs.js
    sed -ie "/lexer-specs/a\ \ \ \ 'specs/gnocchi-specs'," <grafana_src_directory>/public/test/test-main.js
    npm install
    npm install -g grunt-cli
    grunt test  # just ignore errors on gnocchi specs.js file, other must pass

Implemented
===========

* Getting measures of a metric with the metric_id
* Getting measures of multiple resources with a search query and a metric name
* Getting measures of metric with the resource id and the metric name
* Getting measures from a cross aggregation query
* Listing resources id for template query.

Not yet implemented
===================


Current Limitation
==================

Grafana doesn’t allow to query two different servers when using the proxy mode,
so we are not able to query Keystone for a token and then query gnocchi.

In proxymode, we need to set a token and the Gnocchi URL on the datasource.

In direct mode, we can use login/password and the Keystone URL.
Note that CORS MUST be enabled on Keystone and Gnocchi servers.

License
=======

APACHE LICENSE Version 2.0, January 2004
