Atlas plugin for Grafana 2.6
===============
Plugin presents 2 ways of input an Atlas query: simple query builder UI and raw query input. You can switch input mode by `Switch raw Atlas query input` option in query row menu dropdown.


Please pay attention to `atlasFormat` property in _plugins.json_ plugin configuration file. Default _json_ Atlas output format allow numeric values like _NaN_ will not get quoted, which can be the cause of problems on Grafana side. Atlas 1.5.0+ supports _std.json_ format. 

More info about Atlas data formats [here](https://github.com/Netflix/atlas/wiki/Output-Formats).

TODO: Add dynamic preloading of available metrics and dimensions(tags).
