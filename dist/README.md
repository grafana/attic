## Azure Monitor Data Source For Grafana

The Azure Monitor Data Source plugin supports Azure Monitor and Application Insights metrics in Grafana.

## Installation

This plugin requires Grafana 4.5 (as this is not released yet, the latest nightly build has to be used.)

### Docker

1. Fetch the latest version of grafana from Docker Hub:  
    `docker pull grafana/grafana:latest`
2. Run Grafana and install the Azure Monitor plugin with this command: 
    ```
    docker run -d --name=grafana -p 3000:3000 -e "GF_INSTALL_PLUGINS=grafana-azure-monitor-datasource" grafana/grafana:latest
    ```
3. Open the browser at: http://localhost:3000 or http://your-domain-name:3000
4. Login in with username: `admin` and password: `admin`
5. To make sure the plugin was installed, check the list of installed data sources. Click the Plugins item in the main menu. Both core data sources and installed data sources will appear.

This ia an alternative command if you want to run Grafana on a different port than the default 3000 port:

```
docker run -d --name=grafana -p 8081:8081 -e "GF_SERVER_HTTP_PORT=8081" -e "GF_INSTALL_PLUGINS=grafana-azure-monitor-datasource" grafana/grafana:master
```

### Existing Grafana with CLI

Grafana comes with a command line tool that can be used to install plugins.

1. Upgrade Grafana to the latest version. Get that [here](https://grafana.com/grafana/download/).
2. Run this command: `grafana-cli plugins install grafana-azure-monitor-datasource`
3. Restart the Grafana server.
4. Open the browser at: http://localhost:3000 or http://your-domain-name:3000
5. Login in with a user that has admin rights. This is needed to create data sources.
6. To make sure the plugin was installed, check the list of installed data sources. Click the Plugins item in the main menu. Both core data sources and installed data sources will appear.


### Manual Installation

If the server where Grafana is installed has no access to the Grafana.com server, then the plugin can be downloaded and manually copied to the server.

1. Upgrade Grafana to the latest version. Get that [here](https://grafana.com/grafana/download/).
2. Get the zip file from Grafana.com: https://grafana.com/plugins/grafana-azure-monitor-datasource/installation and click on the link in step 1 (with this text: "Alternatively, you can manually download the .zip file")
3. Extract the zip file into the data/plugins subdirectory for Grafana.
4. Restart the Grafana server
5. To make sure the plugin was installed, check the list of installed data sources. Click the Plugins item in the main menu. Both core data sources and installed data sources will appear.

## Configure the data source

The plugin can access metrics from both the Azure Monitor service and the Application Insights API. You can configure access to one service or both services.

- [Guide to setting up an Azure Active Directory Application.](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-create-service-principal-portal)
- [Quickstart Guide for Application Insights.](https://dev.applicationinsights.io/quickstart/)

1. Accessed from the Grafana main menu, newly installed data sources can be added immediately within the Data Sources section. Next, click the  "Add data source" button in the upper right. The data source will be available for selection in the Type select box.
2. Select Azure Monitor from the Type dropdown:
![Data Source Type](https://raw.githubusercontent.com/grafana/azure-monitor-datasource/master/src/img/config_1_select_type.png)
3. In the name field, fill in a name for the data source. It can be anything. Some suggestions are Azure Monitor or App Insights.
4. If you are using Azure Monitor, then you need 4 pieces of information from the Azure portal (see link above for detailed instructions):
    - Subscription Id (Subscriptions -> Choose subscription -> Overview -> Subscription ID)
    - Tenant Id (Azure Active Directory -> Properties -> Directory ID)
    - Client Id (Azure Active Directory -> App Registrations -> Choose your app -> Application ID)
    - Client Secret ( Azure Active Directory -> App Registrations -> Choose your app -> Keys)
5. Paste these four items into the fields in the Azure Monitor API Details section:
    ![Azure Monitor API Details](https://raw.githubusercontent.com/grafana/azure-monitor-datasource/master/src/img/config_2_azure_monitor_api_details.png)
6. If you are are using  Application Insights, then you need two pieces of information from the Azure Portal (see link above for detailed instructions):
    - Application ID
    - API Key
7. Paste these two items into the appropriate fields in the Application Insights API Details section:
    ![Application Insights API Details](https://raw.githubusercontent.com/grafana/azure-monitor-datasource/master/src/img/config_3_app_insights_api_details.png)
8. Test that the configuration details are correct by clicking on the "Save & Test" button:
    ![Azure Monitor API Details](https://raw.githubusercontent.com/grafana/azure-monitor-datasource/master/src/img/config_4_save_and_test.png)

### Development

To install and build the plugin:

1. `git clone` this project into your `data/plugins` subdirectory in your Grafana instance.
2. `yarn install --pure-lockfile`
3. `grunt`
4. `karma start --single-run` to run the tests once.
5. Restart your Grafana server to start using the plugin in Grafana (Grafana only needs to be restarted once).

`grunt watch` will build the TypeScript files and copy everything to the dist directory automatically when a file changes. This is useful for when working on the code. `karma start` will turn on the karma file watcher so that it reruns all the tests automatically when a file changes.

The plugin is written in TypeScript and changes should be made in the `src` directory. The build task transpiles the TypeScript code into JavaScript and copies it to the `dist` directory. Grafana will load the JavaScript from the `dist` directory and ignore the `src` directory.

### CHANGELOG

#### v0.0.1

- First version. Can show metrics from both the Azure Monitor service and the Application Insights service. Can combine metrics from both services on the same dashboard.

#### v0.0.2

- Changes legend format for Azure Monitor to `resourceName.metricName` instead of just `metricName`.

#### v0.0.3

Uses the latest version of the Azure Monitor REST API (2017-05-01-preview). Does not currently change anything for the user but enables new features in the future.
