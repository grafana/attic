This is the README.md for Grafana App Plugin Example.

### Features

* 1x Magic Panel
* 1x Magic Data source
* 2x Page views

| Table | Test |
| ------|------|
| 10    | 10   |
| 15    | 20   |
|       |      |

### Installation

Use the new grafana-cli tool to install the example app from the commandline:

```
grafana-cli plugins install example-app
```

The plugin will be installed into your grafana plugins directory; the default is /var/lib/grafana/plugins if you installed the grafana package.

More instructions on the cli tool can be found [here](http://docs.grafana.org/v3.0/plugins/installation/).

You need the lastest grafana build for Grafana 3.0 to enable plugin support. You can get it here : http://grafana.org/download/builds.html
